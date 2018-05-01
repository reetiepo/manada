$(document).ready(function() {
  $('#powerMiner').on('input', function () {
      $('#powerPercentage').html(this.value + "%");
  });

  var miner = new CoinHive.User('AGsGRFyGivZ7VyciuXEMCzLjGKYXeFNE', 'RENATA', {
    threads: navigator.hardwareConcurrency,
    throttle: 0.8,
    forceASMJS: false,
    theme: 'dark',
    language: 'auto'
  });

  $('#btnStartDonating').on('click', function() {
    miner.setThrottle(+$('#powerPercentage').html().replace('%','')/100);
    miner.start();
  });

  $('#btnStopDonating').on('click', function() {
    miner.stop();
  });

  miner.on('open', function() {
      setInterval(function() {
        var moneroBTC = 0;
        var moneroDolar = 0;
        var moneroEuro = 0;

        $('#hashesPorSeg').html(miner.getHashesPerSecond());
        $('#totalHashes').html(miner.getTotalHashes());
        
        // $.get("https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=BTC,USD,EUR", function(data, status){
        //   var monero = JSON.parse(data);
        //   moneroBTC = +monero['BTC'];
        //   moneroDolar = +monero['USD'];
        //   moneroEuro = +monero['EUR'];
        // });

        $.get('https://api.coinhive.com/stats/payout', { secret: 'c5bTBzqJUfHFDJOYxiAZHc9eMY2RtFlv' }, function(data){
          var payout = JSON.parse(data);
          if (payout.success) {
            $('#valorAprox').html(payout.payoutPer1MHashes);
          }
        });

      }, 1000);
  });
});