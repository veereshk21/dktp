import React, { Component } from 'react';

class ChatAndC2C extends Component {
  componentDidMount() {
    const pageIdProperty = window.location.pathname + window.location.hash.split('?')[0];
    setTimeout(() => {
      if (window.PageIds !== null && window.PageIds !== undefined) {
        window.inqSiteId = window.PageIds[pageIdProperty];
        if (window.inqSiteId && window.Inq && window.Inq.reinitChat) {
          try {
            window.Inq.reinitChat(window.inqSiteId);
          } catch (err) {
            console.log('Unable to reinitialize chat: ' + err);
          }
        }
      }
      // document.getElementsByTagName('script')[0].src.split('?')[0];
      // tag.src.split('?')[0] === c2cjs
      // const c2cjs = 'https://scache.vzw.com/support/etc/designs/support_rd/c2c.js';
      // const scriptArray = Array.prototype.slice.call(document.getElementsByTagName('script'));
      // const c2cJSIndex = scriptArray.filter((tag, index) => {
      //   if (tag.src.split('?')[0] === c2cjs) {
      //     console.log(index);
      //     console.log(tag.src);
      //     console.log(index);
      //     return index;
      //   }
      //   return -1;
      // });
      // document.getElementsByTagName('script')[c2cJSIndex].remove();
      // console.log(document.getElementsByTagName('script'));
      // const newC2CJs = document.createElement('script');
      // newC2CJs.src = `${c2cjs}?_=${Date.now()}`;
      // const headTag = document.getElementsByName('head')[0];
      // headTag.appendChild(newC2CJs);
      // console.log(document.getElementsByTagName('script'));
    }, 2000);

    // Write script to re-initialize the c2c.js script tag
    // https://stcache.vzw.com/support/etc/designs/support_rd/c2c.js?_=1524603752368
    // https://stcache.vzw.com/support/etc/designs/support_rd/c2c.js?_=1524603819649
    // https://stcache.vzw.com/support/etc/designs/support_rd/c2c.js
  }
  render = () => (
    <div className="textAlignRight positionRelative">
      <div id="inqC2CImgContainer_Fixed1" className="displayInlineBlock" />
      <div id="c2c_container_desktop" className="displayInlineBlock c2c_container_desktop" />
    </div>
  )
}

export default ChatAndC2C;
