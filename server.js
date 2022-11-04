const puppeteer = require('puppeteer');

(async () => {

    //ürün linkleri
    var linkler=[
    "https://www.trendyol.com/trendyolmilla/siyah-pileli-elbise-twoss20el0980-p-34609776/yorumlar",
    "https://www.trendyol.com/trendyol-man/siyah-erkek-genis-kesim-fit-sirt-baskili-t-shirt-tmnss20ts0277-p-40435671/yorumlar",
    "https://www.trendyol.com/trendyol-man/siyah-erkek-regular-fit-dik-yakali-baskili-kisa-kollu-t-shirt-tmnss21ts0381-p-79918688/yorumlar",
    "https://www.trendyol.com/trendyol-man/siyah-erkek-oversize-bisiklet-yaka-baskili-kisa-kollu-t-shirt-tmnss21ts1223-p-83247451/yorumlar",
    "https://www.trendyol.com/trendyol-man/siyah-basic-erkek-bisiklet-yaka-oversize-kisa-kollu-t-shirt-tmnss21ts0811-p-79866057/yorumlar",
    "https://www.trendyol.com/trendyol-man/lacivert-erkek-oversize-bisiklet-yaka-baskili-t-shirt-tmnss21ts1219-p-81685907/yorumlar",
    "https://www.trendyol.com/de-plein/unisex-kirmizi-oversize-kapusonlu-100-pamuk-t-shirt-p-43347073/yorumlar"
    
    ];

    const listeuzunluk=linkler.length;

 //başlangıç sayfası oluşturmak için 
  const url = "https://www.trendyol.com/trendyolmilla/siyah-pileli-elbise-twoss20el0980-p-34609776";
  const browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(url);
  
//kategori verisi
  const [categoryName] = await page.$x('/html/body/div[1]/div[4]/main/div/div[2]/a[3]/span');
  const categoryNameText = await categoryName.getProperty("textContent");
  const categoryNameTextValue = await categoryNameText.jsonValue();

  console.log("Kategori: "+categoryNameTextValue);

//döngü ile gidilecek adresleri listeden çekiyoruz
for(i=0;i<listeuzunluk;i++){
  await page.goto(linkler[i]);
 
 //ürün ismi
 
  const [urun] = await page.$x('/html/body/div[1]/div[3]/div/div/div[1]/div/div[1]/div[2]/h1/span[2]');
  const urunText = await urun.getProperty("textContent");
  const urunTextValue = await urunText.jsonValue();
  console.log("-------------------------------------")
  console.log("Ürün Adı : "+urunTextValue);
  

  //ürün puanı
  const [puan] = await page.$x('html/body/div[1]/div[3]/div/div/div[2]/div/div[2]/div[1]/div/div[1]/span');
  const puanText = await puan.getProperty("textContent");
  const puanTextValue = await puanText.jsonValue();
  console.log("Ürün Puanı : "+puanTextValue);

  //yorumlar--->25'den başlama sebebi yorum değerlerinin benzer sayılarda başlaması ve sadece 'a' değerinin yorumlarda değişiyor olması.

  var a=25;
  while(a<=45){

  const [comment1] = await page.$x('/html/body/div[1]/div[3]/div/div/div[2]/div/div[2]/div[3]/div[2]/div['+a+']/div[1]/div/p');
  const c1 = await comment1.getProperty("textContent");
  const c1Value = await c1.jsonValue();
  console.log("Yorum :> "+c1Value);
  a=a+2;
  }
}
  

  await browser.close();
})();