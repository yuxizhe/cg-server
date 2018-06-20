var Nebulas = require('nebulas')

var Neb = Nebulas.Neb
var neb = new Neb()
neb.setRequest(new Nebulas.HttpRequest('https://mainnet.nebulas.io'))

var dappAddress = 'n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt'
var userAddress = 'n1PwP8hSaJo7ZUtK59kgpQ3oggasoBRB18g'

/**
 * 获取函数
 * @param {*} func
 * @param {*} args 参数 【】  ["sdfasf"]
 * @param {*} address 来源地址  没有就随机生成
 */
function nebGet(func, args, address) {
  var from = userAddress
  if (address) {
    from = address
  }
  var value = '0'
  var nonce = '0'
  var gas_price = '1000000'
  var gas_limit = '2000000'
  var callFunction = func
  var callArgs = JSON.stringify(args) //in the form of ["args"]
  var contract = {
    function: callFunction,
    args: callArgs
  }

  return new Promise((res, rej) => {
    neb.api
      .call(from, dappAddress, value, nonce, gas_price, gas_limit, contract)
      .then(data => {
        try {
          var result = JSON.parse(data.result)
          if (result && result.length > 0) {
            res(result)
          } else {
            console.error('error')
            rej('error')
          }
        } catch (error) {
          console.error(error)
          rej('error')
        }
      })
      .catch(error => {
        console.error(error)
        rej('error')
      })
  })
}

function getBuyList() {
  nebGet('buyOrderIndex', []).then(res => {
    nebGet('getBuyOrder', [res]).then(res2 => {
      global.buyList = res2
      console.log('get buy list')
    })
  })
}

function getSellList() {
  nebGet('sellOrderIndex', []).then(res => {
    nebGet('getSellOrder', [res]).then(res2 => {
      global.sellList = res2
      console.log('get sell list')
    })
  })
}

function getBurnList() {
  nebGet('burnOrderIndex', []).then(res => {
    nebGet('getBurnOrder', [res]).then(res2 => {
      global.burnList = res2
      console.log('get burn list')
    })
  })
}

function getBalance() {
  nebGet('balance', []).then(res => {
    global.balance = res
    console.log('get balance')
  })
}
function getInsureBalance() {
  nebGet('insureBalance', []).then(res => {
    global.insureBalance = res
    console.log('get insure balance')
  })
}

function getList() {
  getBuyList()
  getSellList()
  getBurnList()
  getBalance()
  getInsureBalance()
}

function service() {
  getList()
  setInterval(getList, 15000)
}

module.exports = service
