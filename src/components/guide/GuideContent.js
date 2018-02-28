import React from 'react';

const GuideContent = () => (
  <div className='guide__content'>
    <h1 id='guide-top'>Hi, I'm sissi.</h1>
    <h2 className='guide__intro'>I am the creator of this tool – and here to help you. I can offer my advice on all these topics:</h2>
    <ul className='guide__main-list'>
      <li className='guide__main-list__item'><a href='#general-usage'>General Usage</a></li>
      <li>
        <ul>
          <li><a href='#general-navigate'>How to navigate through the website manager?</a></li>
          <li><a href='#general-add'>How to add pages and sections?</a></li>
          <li><a href='#general-delete'>How to delete pages and sections?</a></li>
          <li><a href='#general-reorder'>How to reorder pages and sections?</a></li>
        </ul>
      </li>
      <li className='guide__main-list__item'><a href='#editor'>Editor</a></li>
      <li>
        <ul>
          <li><a href='#editor-markdown'>Why are there weird characters in my content?</a></li>
          <li><a href='#editor-paragraph'>How to add a paragraph?</a></li>
          <li><a href='#editor-headings'>How to add different headings?</a></li>
          <li><a href='#editor-italic'>How to make text appear italic?</a></li>
          <li><a href='#editor-list'>How to add a list?</a></li>
          <li><a href='#editor-link'>How to enter a link?</a></li>
          <li><a href='#editor-image'>How to add an image?</a></li>
        </ul>
      </li>
    </ul>
    <h2 id='general-usage'>General Use <a href='#guide-top' className='guide__to-top'>▲</a></h2>
    <p>This website manager is what’s generally called a content management system – short CMS. As such it helps you to edit, add and remove the contents of your website. The CMS needs to be connected to your website and configured by a developer (and, since you’re here, they’ve obviously done this!) so there are certain things only they can help you with. But I can guide you through the general usage of this tool</p>
    <h3 id='general-navigate'>How to navigate through the website manager? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>The first thing you see when you open the website manager is the index page. Here you can edit the meta data of your website. If you ever want to get back here just find the ‘INDEX’ button in the top right corner or close the page you are currently on.</p>
    <p>You can open and close pages by clicking on them in the nav bar – click once: open the page, click again: close the page. The same goes for sections within the pages. Remember, though: When you close a section or page without saving first your changes will be lost!</p>
    <h3 id='general-add'>How to add pages and sections? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>To add just click the ‘ADD’ button in the corresponding nav bar – if the ‘ADD’ button disappears you have reached the maximum page or section limit set by your developer.</p>
    <h3 id='general-delete'>How to delete pages and sections? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>To delete open the page or section you want to remove and click the ‘DELETE’ button. Keep in mind that deleting a page will also remove all the sections within! If the ‘DELETE’ button disappears you have reached the minimum page or section limit set by your developer. Note that some pages and sections (such as a contact form) might also be protected from deletion by your developer.</p>
    <h3 id='general-reorder'>How to reorder pages and sections? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>Simple! Just drag and drop them in the nav bar. When you move a page, all its sections will move with it.</p>
    <h2 id='editor'>Editor <a href='#guide-top' className='guide__to-top'>▲</a></h2>
    <p>The editor is where most of the magic happens. Here you can add and edit your content – text, images, links, you name it. If you only have text to add this is easy – just start typing! If you want to format your text and add other content things get a bit more exciting.</p>
    <p>There are two main ways to use the editor: either by typing markdown characters or by clicking on the desired format in the toolbar which will enter the required markdown characters for you.</p>
    <h3 id='editor-markdown'>Why are there weird characters in my content? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>The editor uses markdown. This is a syntax that helps us translate your content for web browsers, so that it can be viewed on your website. So, please don’t worry about all the weird ##s and []s and __s – they are very important to make all this work but will all be removed and never appear on your website!</p>
    <h3 id='editor-paragraph'>How to add a paragraph? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>You can just click in the editor and start writing – this will produce regular text. If you want to start a new paragraph just hit enter twice, to leave an empty line in between.</p>
    <h3 id='editor-headings'>How to add different headings? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>You can add headings by entering # on the beginning of a line. To change the level of the heading just enter another # (or click on the H button again). In general # is the highest possible level while ###### is the lowest. For details on which levels you are supposed to use and how they will be formatted please consult your developer.</p>
    <h3 id='editor-italic'>How to make text appear italic? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>To make text appear italic you need to wrap it in underscores, one at the beginning of the italic text, one at the end. Make sure to write everything you do NOT want to be italic after the second underscore.</p>
    <h3 id='editor-list'>How to add a list? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>To make a list you need to move your cursor on a new line, then add a * and a blank space before you start writing your first list entry. To add another entry just repeat the process. When your list is done you need to enter an empty line below – this is really important to make the editor understand that the following content is not part of the list.</p>
    <h3 id='editor-link'>How to enter a link? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>A link is written in the following way: [the link text](the link url, e.g. https://google.com). You can place links anywhere in your text, no need to start a new line.</p>
    <h3 id='editor-image'>How to enter an image? <a href='#guide-top' className='guide__to-top'>▲</a></h3>
    <p>Now, images are something very special. In markdown they are entered almost like links: ![image description](image url, e.g. /images/example.jpeg). With the difference that the image description will not be displayed in your content – but screen readers will read it to blind people so they can understand what they’re supposed to be seeing. And don’t forget the ! before the whole thing!</p>
    <p>However, you will probably want to upload your own images or choose one of the images you have already uploaded earlier. And you can do this by clicking on the image button in the toolbar. Once you have chosen your image it is important to COPY the line that you are given and paste it into your content, wherever you want to place your image. You can then add the image description.</p>
    <p>Unfortunately we have no way of showing you the image in the editor right now. But trust us, on your website it will look awesome!</p>
  </div>
);

export default GuideContent;
