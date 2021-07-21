const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [
    {logo: 'V', url: 'https://cn.vuejs.org'},
    {logo: 'R', url: 'https://react.docschina.org'},
    {logo: 'S', url: 'https://stackoverflow.com'},
]
const simplifyUrl = (url)=>{
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace('/','')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()

    hashMap.forEach(node => {
        const $li = $(`<li>
                <a href="${node.url}">
                    <div class="site">
                       <div class="logo">${node.logo}</div>
                       <div class="link">${simplifyUrl(node.url)}</div>
                    </div>
                </a>
           </li>`).insertBefore($lastLi)
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({logo: simplifyUrl(url)[0].toUpperCase(), url: url})
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}