const { BN, constants, expectEvent, expectRevert, ether } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

const {
  shouldBehaveLikeERC20,
  shouldBehaveLikeERC20Transfer,
  shouldBehaveLikeERC20Approve,
  shouldBehaveLikeTokenRecover,
} = require('./HeartRithm.behavior');

const HeartRithm = artifacts.require('HeartRithm');

contract('HeartRithm', function (accounts) {
  const [ initialHolder, recipient, anotherAccount, other ] = accounts;

  const name = 'HeartRithm';
  const symbol = 'HEART';

  const initialSupply = ether('100');

  const amount = new BN('5000');

  const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const MINTER_ROLE = web3.utils.soliditySha3('MINTER_ROLE');
  const PAUSER_ROLE = web3.utils.soliditySha3('PAUSER_ROLE');
  
  beforeEach(async function () {
    heart = await HeartRithm.new();
    await heart.mint(initialHolder, initialSupply);
  });

  it('has a name', async function () {
    expect(await heart.name()).to.equal(name);
  });

  it('has a symbol', async function () {
    expect(await heart.symbol()).to.equal(symbol);
  });

  it('has 18 decimals', async function () {
    expect(await heart.decimals()).to.be.bignumber.equal('18');
  });

  shouldBehaveLikeERC20('ERC20', initialSupply, initialHolder, recipient, anotherAccount);

  describe('_mint', function () {
    const amount = new BN(50);
    it('rejects a null account', async function () {
      await expectRevert(
        heart.mint(ZERO_ADDRESS, amount), 'ERC20: mint to the zero address',
      );
    });

    describe('for a non zero account', function () {
      beforeEach('minting', async function () {
        const { logs } = await heart.mint(recipient, amount);
        this.logs = logs;
      });

      it('only owner can mint tokent', async function () {
        await expectRevert(heart.mint(recipient, amount, { from: recipient }),
        'ERC20PresetMinterPauser: must have minter role to mint');
      });

      it('increments totalSupply', async function () {
        const expectedSupply = initialSupply.add(amount);
        expect(await heart.totalSupply()).to.be.bignumber.equal(expectedSupply);
      });

      it('increments recipient balance', async function () {
        expect(await heart.balanceOf(recipient)).to.be.bignumber.equal(amount);
      });

      it('emits Transfer event', async function () {
        const event = expectEvent.inLogs(this.logs, 'Transfer', {
          from: ZERO_ADDRESS,
          to: recipient,
        });

        expect(event.args.value).to.be.bignumber.equal(amount);
      });
    });
  });

  describe('_burn', function () {
    describe('for a non zero account', function () {
      it('rejects burning more than balance', async function () {
        await expectRevert(heart.burn(
          initialSupply.addn(1)), 'ERC20: burn amount exceeds balance',
        );
      });

      const describeBurn = function (description, amount) {
        describe(description, function () {
          beforeEach('burning', async function () {
            const { logs } = await heart.burn(amount);
            this.logs = logs;
          });

          it('decrements totalSupply', async function () {
            const expectedSupply = initialSupply.sub(amount);
            expect(await heart.totalSupply()).to.be.bignumber.equal(expectedSupply);
          });

          it('decrements initialHolder balance', async function () {
            const expectedBalance = initialSupply.sub(amount);
            expect(await heart.balanceOf(initialHolder)).to.be.bignumber.equal(expectedBalance);
          });

          it('emits Transfer event', async function () {
            const event = expectEvent.inLogs(this.logs, 'Transfer', {
              from: initialHolder,
              to: ZERO_ADDRESS,
            });

            expect(event.args.value).to.be.bignumber.equal(amount);
          });
        });
      };

      describeBurn('for entire balance', initialSupply);
      describeBurn('for less amount than balance', initialSupply.subn(1));
    });
  });

  describe('_transfer', function () {
    shouldBehaveLikeERC20Transfer('ERC20', initialHolder, recipient, initialSupply, function (from, to, amount) {
      return heart.transfer(from, to, amount);
    });
  });

  describe('_approve', function () {
    shouldBehaveLikeERC20Approve('ERC20', initialHolder, recipient, initialSupply, function (owner, spender, amount) {
      return heart.approve(owner, spender, amount);
    });
  });

  it('deployer has the default admin role', async function () {
    expect(await heart.getRoleMemberCount(DEFAULT_ADMIN_ROLE)).to.be.bignumber.equal('1');
    expect(await heart.getRoleMember(DEFAULT_ADMIN_ROLE, 0)).to.equal(initialHolder);
  });

  it('deployer has the minter role', async function () {
    expect(await heart.getRoleMemberCount(MINTER_ROLE)).to.be.bignumber.equal('1');
    expect(await heart.getRoleMember(MINTER_ROLE, 0)).to.equal(initialHolder);
  });

  it('deployer has the pauser role', async function () {
    expect(await heart.getRoleMemberCount(PAUSER_ROLE)).to.be.bignumber.equal('1');
    expect(await heart.getRoleMember(PAUSER_ROLE, 0)).to.equal(initialHolder);
  });

  it('minter and pauser role admin is the default admin', async function () {
    expect(await heart.getRoleAdmin(MINTER_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
    expect(await heart.getRoleAdmin(PAUSER_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
  });

  describe('minting', function () {
    it('deployer can mint tokens', async function () {
      const receipt = await heart.mint(other, amount, { from: initialHolder });
      expectEvent(receipt, 'Transfer', { from: ZERO_ADDRESS, to: other, value: amount });

      expect(await heart.balanceOf(other)).to.be.bignumber.equal(amount);
    });

    it('other accounts cannot mint tokens', async function () {
      await expectRevert(
        heart.mint(other, amount, { from: other }),
        'ERC20PresetMinterPauser: must have minter role to mint',
      );
    });
  });

  describe('pausing', function () {
    it('deployer can pause', async function () {
      const receipt = await heart.pause({ from: initialHolder });
      expectEvent(receipt, 'Paused', { account: initialHolder });

      expect(await heart.paused()).to.equal(true);
    });

    it('deployer can unpause', async function () {
      await heart.pause({ from: initialHolder });

      const receipt = await heart.unpause({ from: initialHolder });
      expectEvent(receipt, 'Unpaused', { account: initialHolder });

      expect(await heart.paused()).to.equal(false);
    });

    it('cannot mint while paused', async function () {
      await heart.pause({ from: initialHolder });

      await expectRevert(
        heart.mint(other, amount, { from: initialHolder }),
        'ERC20Pausable: token transfer while paused',
      );
    });

    it('other accounts cannot pause', async function () {
      await expectRevert(
        heart.pause({ from: other }),
        'ERC20PresetMinterPauser: must have pauser role to pause',
      );
    });

    it('other accounts cannot unpause', async function () {
      await heart.pause({ from: initialHolder });

      await expectRevert(
        heart.unpause({ from: other }),
        'ERC20PresetMinterPauser: must have pauser role to unpause',
      );
    });
  });

  describe('burning', function () {
    it('holders can burn their tokens', async function () {
      await heart.mint(other, amount, { from: initialHolder });

      const receipt = await heart.burn(amount.subn(1), { from: other });
      expectEvent(receipt, 'Transfer', { from: other, to: ZERO_ADDRESS, value: amount.subn(1) });

      expect(await heart.balanceOf(other)).to.be.bignumber.equal('1');
    });
  });

  describe('Token recover', function () {
    shouldBehaveLikeTokenRecover(initialHolder, recipient);
  });
});