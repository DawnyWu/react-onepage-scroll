react-onepage-scroll
===
一个用react实现的onepage-scroll组件

支持鼠标滚轮

![Alt Text](http://g.recordit.co/23rW3mUKv1.gif)

支持手机滑动

![Alt Text](http://g.recordit.co/BOmwWNKTOw.gif)

# DEMO

在线demo: [http://103.253.146.179:3008/](http://103.253.146.179:3008/)

本地demo:

```js
git clone https://github.com/DawnyWu/react-onepage-scroll.git
npm install
cd example
npm start
```
在浏览器中打开 http://localhost:3001 即可查看例子


# 使用
`npm install react-onepage-scroll --save`


```js
import {ScrollSection, ScrollContainer} from 'react-onepage-scroll'

<ScrollContainer>
  <ScrollSection style={{backgroundImage: 'url(http://www.thepetedesign.com/demos/phones.png)',
                         backgroundRepeat: 'no-repeat' }} 
                         pageId={0}>
      <img style={{position: 'absolute', top: 0, right: 0, border: 0, zIndex: 999}} src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"/>
    </a>
  </ScrollSection>

  <ScrollSection style={{backgroundImage: 'url(http://www.thepetedesign.com/demos/back-phone.png)',
                         backgroundRepeat: 'no-repeat'}}
                         pageId={1}>
  </ScrollSection>

  <ScrollSection style={{backgroundImage: 'url(http://www.thepetedesign.com/demos/tilted-phone.png)',
                         backgroundRepeat: 'no-repeat'}}
                 pageId={2}>
  </ScrollSection>
</ScrollContainer>
```

## Inspired by
[onepage-scroll](https://github.com/peachananr/onepage-scroll)

# License

MIT


