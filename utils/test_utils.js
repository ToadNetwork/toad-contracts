
async function printAllowances(phase, environment) {
    allowance00 = await token.allowance(environment.token.address, environment.token.address);
    allowance01 = await token.allowance(environment.token.address, environment.owner.address);
    allowance02 = await token.allowance(environment.token.address, environment.account1.address);
    allowance10 = await token.allowance(environment.owner.address, environment.token.address);
    allowance11 = await token.allowance(environment.owner.address, environment.owner.address);
    allowance12 = await token.allowance(environment.owner.address, environment.account1.address);
    allowance20 = await token.allowance(environment.account1.address, environment.token.address);
    allowance21 = await token.allowance(environment.account1.address, environment.owner.address);
    allowance22 = await token.allowance(environment.account1.address, environment.account1.address);

    console.log(`${phase} allowances:\r\ntoken: (${allowance00},${allowance01},${allowance02})\r\nowner: (${allowance10},${allowance11},${allowance12})\r\naccount1: (${allowance20},${allowance21},${allowance22})\r\n`);
}
async function tokenBalances(phase, environment) {
    let balanceToken = await environment.token.balanceOf(environment.token.address);
    let balanceOwner = ethers.utils.parseUnits((await environment.token.balanceOf(environment.owner.address)).toString(), 'wei');
    let balanceAccount1 = await environment.token.balanceOf(environment.account1.address);

    console.log(`${phase} balances:\r\ntoken:${balanceToken},\r\nowner:${balanceOwner},\r\naccount1:${balanceAccount1}`)
}

module.exports = {printAllowances, tokenBalances}