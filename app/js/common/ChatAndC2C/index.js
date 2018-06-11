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
      if (window.c2c !== null && window.c2c !== undefined) {
        try {
          console.log('trying  the try');
          window.c2c.initializeC2C([{ buttonname: 'generic-c2c-container-desktop', targeteddiv: ['c2c_container_desktop'], url: '/content/vzw-engage/c2c/btn.display.generic-c2c-container-desktop.html' }]);
        } catch (err) {
          console.log('Unable to reinitialize c2c: ' + err);
        }
      }
    }, 2000);
  }
  render = () => (
    <div className="textAlignRight positionRelative">
      <div id="inqC2CImgContainer_Fixed1" className="displayInlineBlock" />
      <div id="c2c_container_desktop" className="displayInlineBlock c2c_container_desktop" />
    </div>
  )
}

export default ChatAndC2C;
