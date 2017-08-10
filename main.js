const request = require('request-promise');
const cheerio = require('cheerio');
// 抓取网址
const target_url = 'https://bj.lianjia.com/ershoufang/rs/';
// 数据根节点选择器
const root = '.sellListContent>.clear';
// 子节点数据抓取策略
const structure = {
    title: '.title>a',
    position: '.houseInfo>a',
    price: '.totalPrice'
}

async function run() {
    let result = await request(target_url);
    let $ = cheerio.load(result);
    let root_item = $(root);
    let box = [];
    root_item.each((index, element) => {
        let buffer = {};
        for (let key in structure) {
            let target = structure[key];
            buffer[key] = trim($(element).find(target).text());
        }
        box.push(buffer);
    })
    return box;
}

run().then(data => {
    console.log(data);
});




function trim(str) {
    return str.replace(/\s+/g, "");
}
