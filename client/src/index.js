const fetchDetails = async (contractMarketPlace, id) => {

  img = document.getElementById("NFTImage");

  details = await contractMarketPlace.methods.getMarketItem(id).call();

  // const contractArtwork = await getContract(web3, "0xc7d8F7Db1Ed3b29376d08711C262e1153d4c6C59",
  // "xyz.json");
  
  itemId = details[0];
  tokenId = details[2];
  sellerAddress = details[3];
  itemPrice = details[5];
  isSold = details[6];

  console.log(isSold);

  $("h2").html("Item Id : " + itemId + "<br><br>"
   + "Seller : " + sellerAddress + "<br><br>"
   + "Item Price : " + itemPrice + " Wei"  + "<br><br>"
   + "Status :" + (isSold ? " Is Already Sold" : " Available"));

  return [isSold, itemPrice];
};

const buyNFTHelper = (contract, accounts, isSold, id, price) => {

  $("#form").on("submit", async (e) => {
    e.preventDefault();

    if(isSold) {
      alert("This Artwork has already been sold...");
    }

    else {

      await contract.methods
      .buyMarketItem(id)
      .send({ 
        from: accounts[0], 
        gas: 40000, 
        value: price
      });
    }

  });
};

async function greetingApp() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const contractMarketPlace = await getContract(web3, "0xB9D6944E89D7Efa365BA8fbD0ac9c84970C8D40E",
  "marketPlace.json");

  const params = new  URLSearchParams(window.location.search);
  id = params.get('id');

  [isSold, price] = await fetchDetails(contractMarketPlace, id, web3);

  buyNFTHelper(contractMarketPlace, accounts, isSold, id, price);
}

greetingApp();
