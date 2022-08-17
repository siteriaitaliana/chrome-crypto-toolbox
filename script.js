
document.getElementById('decimalInput').addEventListener("focus", function(event) {
  document.getElementById('decimalInput').value = ''
  document.getElementById('hexaInput').value = ''
})
document.getElementById('hexaInput').addEventListener("focus", function(event) {
  document.getElementById('hexaInput').value = ''
  document.getElementById('decimalInput').value = ''
})
document.getElementById('etherScanInput').addEventListener("focus", function(event) {
  document.getElementById('etherScanInput').value = ''
})

$(document).ready(function () {
  $('input[type=radio]').click(function () {
    var state = $(this)[0].checked, 
        g = $(this).data('group');
     $(this).siblings()
     .each(function () {
$(this)[0].checked = g==$(this).data('group')&&state ? false : $(this)[0].checked;
     });
});
})


document.getElementById('search').addEventListener("click", function(event) {
  let etherScanInput = document.getElementById('etherScanInput').value;
  var networkType = $("input[data-group='type-of-network']:checked").val();
  let url
  switch(networkType){
    case "Mainnet":
      url = 'etherscan.io';
      break;
    case "Goerli":
      url = 'goerli.etherscan.io';
      break;
    case "Sepolia":
      url = 'sepolia.etherscan.io';
      break;
    case "Ropsten":
      url = 'ropsten.etherscan.io';
      break;
  }
  if(etherScanInput && url){
    window.open(`https://${url}/search?f=0&q=${etherScanInput}`
    ,"_blank");
  }
});

document.getElementById('click_me').addEventListener("click", function(event) {
  let decimalVal = document.getElementById('decimalInput').value
  let hexaVal = document.getElementById('hexaInput').value
  if (decimalVal && hexaVal){
      document.getElementById('output').innerHTML = "Input the decimal or the hex not both together"
  } else if(decimalVal) {
    // https://web3js.readthedocs.io/en/v1.2.6/web3-utils.html#tohex
    // Will auto convert any given value to HEX. Number strings will interpreted as numbers. Text strings will be interpreted as UTF-8 strings.
      document.getElementById('output').innerHTML = Web3.utils.toHex(decimalVal)
  } else if (hexaVal){
    if(Web3.utils.isHexStrict(hexaVal)){
      document.getElementById('output').innerHTML = Web3.utils.hexToNumberString(hexaVal)
    } else {
      document.getElementById('output').innerHTML = "Check the HEX is prefixed with 0x and a valid HEX"
    }
  } else if (!decimalVal && !hexaVal){
    document.getElementById('output').innerHTML = "Input either the decimal or the hex"
  }
});


document.getElementById('searchSignature').addEventListener("click", function() {
  let input = document.getElementById('signatureInput').value
  fetch(`https://www.4byte.directory/api/v1/signatures/?hex_signature=${input}`)
  .then((response) => response.json())
  .then((data) => {
    let arr = []
    data.results.map(o => {
      arr.push(o.text_signature)
    })
    document.getElementById('signatureOutput').innerHTML = arr.join().split(',')
    }
  );
});

