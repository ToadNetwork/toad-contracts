
async function tokenAllowances(_phase, _environment) {
    let token=_environment.token;
    let owner=_environment.owner;
    let account1=_environment.account1;
    let allowance00 = await token.allowance(token.address, token.address);
    let allowance01 = await token.allowance(token.address, owner.address);
    let allowance02 = await token.allowance(token.address, account1.address);
    let allowance10 = await token.allowance(owner.address, token.address);
    let allowance11 = await token.allowance(owner.address, owner.address);
    let allowance12 = await token.allowance(owner.address, account1.address);
    let allowance20 = await token.allowance(account1.address, token.address);
    let allowance21 = await token.allowance(account1.address, owner.address);
    let allowance22 = await token.allowance(account1.address, account1.address);

    console.log(`${_phase} allowances:\r\ntoken: (${allowance00},${allowance01},${allowance02})\r\nowner: (${allowance10},${allowance11},${allowance12})\r\naccount1: (${allowance20},${allowance21},${allowance22})\r\n`);
}
async function tokenBalances(phase, environment) {
    let balanceToken = await environment.token.balanceOf(environment.token.address);
    let balanceOwner = ethers.utils.parseUnits((await environment.token.balanceOf(environment.owner.address)).toString(), 'wei');
    let balanceAccount1 = await environment.token.balanceOf(environment.account1.address);

    console.log(`${phase} balances:\r\ntoken:${balanceToken},\r\nowner:${balanceOwner},\r\naccount1:${balanceAccount1}`)
}

module.exports = {tokenAllowances, tokenBalances}