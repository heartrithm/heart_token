const Token = artifacts.require("HeartRithm");

module.exports = async function (deployer) {
    const TGE_TIMESTAMP = "1618917387"; // amount of tge in seconds
    await deployer.deploy(Token);
};
