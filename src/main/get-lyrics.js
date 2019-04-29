const osmosis = require('osmosis');
osmosis.config('user_agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36');
osmosis.config('tries', 1);
osmosis.config('concurrency', 2);

// osmosis.config('keep_data', true);
module.exports = (name) => {
    return new Promise((resolve, reject) => {
        const base = '//*[contains(@id,"uid_")]/div[1]/div[2]';
        osmosis
            .get(`https://www.google.com/search?q=${name.replace(' ', '+')}+lyrics&hl=en`)
            .set({
                title: `${base}/div[1]/div[2]/div/div/div/div[1]/span`,
                artist: `${base}/div[1]/div[2]/div/div/div/div[2]`,
                credits: `${base}/div[2]/div/div/div/div[2]`,
                paragraphs: osmosis.find(`${base}/div[2]/div/div/div/div[1]/div//div`).set({lines: ['.//span']}),
                searchResults: osmosis.find('.g').set({title: 'h3', link: 'a@href'})
            })
            .data(data => {
                resolve(data)
            })
            .log(console.log)
            .error(console.log)
            .debug(console.log)
    })
}
