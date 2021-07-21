const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [
    {logo: 'V', url: 'https://cn.vuejs.org'},
    {logo: 'R', url: 'https://react.docschina.org'},
    {logo: 'S', url: 'https://stackoverflow.com'},
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()

    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                    <div class="site">
                       <div class="logo">${node.logo}</div>
                       <div class="link">${simplifyUrl(node.url)}</div>
                       <div class="close">
                           <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
           </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
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
    localStorage.setItem('x', string)
}