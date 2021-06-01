const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;
const ERC20 = artifacts.require('HeartRithm');

function shouldBehaveLikeERC20 (errorPrefix, initialSupply, initialHolder, recipient, anotherAccount) {
  describe('total supply', function () {
    it('returns the total amount of tokens', async function () {
      expect(await heart.totalSupply()).to.be.bignumber.equal(initialSupply);
    });
  });

  describe('balanceOf', function () {
    describe('when the requested account has no tokens', function () {
      it('returns zero', async function () {
        expect(await heart.balanceOf(anotherAccount)).to.be.bignumber.equal('0');
      });
    });

    describe('when the requested account has some tokens', function () {
      it('returns the total amount of tokens', async function () {
        expect(await heart.balanceOf(initialHolder)).to.be.bignumber.equal(initialSupply);
      });
    });
  });

  describe('transfer', function () {
    shouldBehaveLikeERC20Transfer(errorPrefix, initialHolder, recipient, initialSupply,
      function (from, to, value) {
        return heart.transfer(to, value, { from });
      },
    );
  });

  describe('transfer from', function () {
    const spender = recipient;

    describe('when the token owner is not the zero address', function () {
      const tokenOwner = initialHolder;

      describe('when the recipient is not the zero address', function () {
        const to = anotherAccount;

        describe('when the spender has enough approved balance', function () {
          beforeEach(async function () {
            await heart.approve(spender, initialSupply, { from: initialHolder });
          });

          describe('when the token owner has enough balance', function () {
            const amount = initialSupply;

            it('transfers the requested amount', async function () {
              await heart.transferFrom(tokenOwner, to, amount, { from: spender });

              expect(await heart.balanceOf(tokenOwner)).to.be.bignumber.equal('0');

              expect(await heart.balanceOf(to)).to.be.bignumber.equal(amount);
            });

            it('decreases the spender allowance', async function () {
              await heart.transferFrom(tokenOwner, to, amount, { from: spender });

              expect(await heart.allowance(tokenOwner, spender)).to.be.bignumber.equal('0');
            });

            it('emits a transfer event', async function () {
              const { logs } = await heart.transferFrom(tokenOwner, to, amount, { from: spender });

              expectEvent.inLogs(logs, 'Transfer', {
                from: tokenOwner,
                to: to,
                value: amount,
              });
            });

            it('emits an approval event', async function () {
              const { logs } = await heart.transferFrom(tokenOwner, to, amount, { from: spender });

              expectEvent.inLogs(logs, 'Approval', {
                owner: tokenOwner,
                spender: spender,
                value: await heart.allowance(tokenOwner, spender),
              });
            });
          });

          describe('when the token owner does not have enough balance', function () {
            const amount = initialSupply.addn(1);

            it('reverts', async function () {
              await expectRevert(heart.transferFrom(
                tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer amount exceeds balance`,
              );
            });
          });
        });

        describe('when the spender does not have enough approved balance', function () {
          beforeEach(async function () {
            await heart.approve(spender, initialSupply.subn(1), { from: tokenOwner });
          });

          describe('when the token owner has enough balance', function () {
            const amount = initialSupply;

            it('reverts', async function () {
              await expectRevert(heart.transferFrom(
                tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer amount exceeds allowance`,
              );
            });
          });

          describe('when the token owner does not have enough balance', function () {
            const amount = initialSupply.addn(1);

            it('reverts', async function () {
              await expectRevert(heart.transferFrom(
                tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer amount exceeds balance`,
              );
            });
          });
        });
      });

      describe('when the recipient is the zero address', function () {
        const amount = initialSupply;
        const to = ZERO_ADDRESS;

        beforeEach(async function () {
          await heart.approve(spender, amount, { from: tokenOwner });
        });

        it('reverts', async function () {
          await expectRevert(heart.transferFrom(
            tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer to the zero address`,
          );
        });
      });
    });

    describe('when the token owner is the zero address', function () {
      const amount = 0;
      const tokenOwner = ZERO_ADDRESS;
      const to = recipient;

      it('reverts', async function () {
        await expectRevert(heart.transferFrom(
          tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer from the zero address`,
        );
      });
    });
  });

  describe('approve', function () {
    shouldBehaveLikeERC20Approve(errorPrefix, initialHolder, recipient, initialSupply,
      function (owner, spender, amount) {
        return heart.approve(spender, amount, { from: owner });
      },
    );
  });
}

function shouldBehaveLikeERC20Transfer (errorPrefix, from, to, balance, transfer) {
  describe('when the recipient is not the zero address', function () {
    describe('when the sender does not have enough balance', function () {
      const amount = balance.addn(1);

      it('reverts', async function () {
        await expectRevert(heart.transfer(to, amount, { from: from }),
          `${errorPrefix}: transfer amount exceeds balance`,
        );
      });
    });

    describe('when the sender transfers all balance', function () {
      const amount = balance;

      it('transfers the requested amount', async function () {
        await heart.transfer(to, amount, { from: from });

        expect(await heart.balanceOf(from)).to.be.bignumber.equal('0');

        expect(await heart.balanceOf(to)).to.be.bignumber.equal(amount);
      });

      it('emits a transfer event', async function () {
        const { logs } = await heart.transfer(to, amount, { from: from });

        expectEvent.inLogs(logs, 'Transfer', {
          from,
          to,
          value: amount,
        });
      });
    });

    describe('when the sender transfers zero tokens', function () {
      const amount = new BN('0');

      it('transfers the requested amount', async function () {
        await heart.transfer(to, amount, { from: from });

        expect(await heart.balanceOf(from)).to.be.bignumber.equal(balance);

        expect(await heart.balanceOf(to)).to.be.bignumber.equal('0');
      });

      it('emits a transfer event', async function () {
        const { logs } = await heart.transfer(to, amount, { from: from });

        expectEvent.inLogs(logs, 'Transfer', {
          from,
          to,
          value: amount,
        });
      });
    });
  });

  describe('when the recipient is the zero address', function () {
    it('reverts', async function () {
      await expectRevert(heart.transfer(ZERO_ADDRESS, balance, { from: from }),
        `${errorPrefix}: transfer to the zero address`,
      );
    });
  });
}

function shouldBehaveLikeERC20Approve (errorPrefix, owner, spender, supply, approve) {
  describe('when the spender is not the zero address', function () {
    describe('when the sender has enough balance', function () {
      const amount = supply;

      it('emits an approval event', async function () {
        const { logs } = await heart.approve(spender, amount, { from: owner });

        expectEvent.inLogs(logs, 'Approval', {
          owner: owner,
          spender: spender,
          value: amount,
        });
      });

      describe('when there was no approved amount before', function () {
        it('approves the requested amount', async function () {
          await heart.approve(spender, amount, { from: owner });

          expect(await heart.allowance(owner, spender)).to.be.bignumber.equal(amount);
        });
      });

      describe('when the spender had an approved amount', function () {
        beforeEach(async function () {
          await heart.approve(spender, new BN(1), { from: owner });
        });

        it('approves the requested amount and replaces the previous one', async function () {
          await heart.approve(spender, amount, { from: owner });

          expect(await heart.allowance(owner, spender)).to.be.bignumber.equal(amount);
        });
      });
    });

    describe('when the sender does not have enough balance', function () {
      const amount = supply.addn(1);

      it('emits an approval event', async function () {
        const { logs } = await heart.approve(spender, amount, { from: owner });

        expectEvent.inLogs(logs, 'Approval', {
          owner: owner,
          spender: spender,
          value: amount,
        });
      });

      describe('when there was no approved amount before', function () {
        it('approves the requested amount', async function () {
          await heart.approve(spender, amount, { from: owner });

          expect(await heart.allowance(owner, spender)).to.be.bignumber.equal(amount);
        });
      });

      describe('when the spender had an approved amount', function () {
        beforeEach(async function () {
          await heart.approve(spender, new BN(1), { from: owner });
        });

        it('approves the requested amount and replaces the previous one', async function () {
          await heart.approve(spender, amount, { from: owner });

          expect(await heart.allowance(owner, spender)).to.be.bignumber.equal(amount);
        });
      });
    });
  });

  describe('when the spender is the zero address', function () {
    it('reverts', async function () {
      await expectRevert(heart.approve(ZERO_ADDRESS, supply, { from: owner }),
        `${errorPrefix}: approve to the zero address`,
      );
    });
  });
}

function shouldBehaveLikeTokenRecover (owner, thirdParty) {
  describe('recoverERC20', function () {
    const amount = new BN(100);

    beforeEach(async function () {
      anotherERC20 = await ERC20.new();
    });

    describe('if owner is calling', function () {
      it('should recover any ERC20', async function () {
        await anotherERC20.mint(heart.address, amount);
        expect(await anotherERC20.balanceOf(heart.address)).to.be.bignumber.equal(amount);
        expect(await anotherERC20.balanceOf(owner)).to.be.bignumber.equal(new BN(0));

        await heart.recoverERC20(anotherERC20.address, amount, { from: owner });

        expect(await anotherERC20.balanceOf(heart.address)).to.be.bignumber.equal(new BN(0));
        expect(await anotherERC20.balanceOf(owner)).to.be.bignumber.equal(amount);
      });
    });

    describe('if third party is calling', function () {
      it('reverts', async function () {
        await expectRevert(
          heart.recoverERC20(anotherERC20.address, amount, { from: thirdParty }),
          'Ownable: caller is not the owner',
        );
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeERC20,
  shouldBehaveLikeERC20Transfer,
  shouldBehaveLikeERC20Approve,
  shouldBehaveLikeTokenRecover,
};