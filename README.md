# scaleText
ScaleText preserves the aspect ratio of Typography still maintaining readability. One doesn’t need to write media queries for scaling text anymore. ScaleText removes code smells and handles font size dynamically in a webpage for any type of display, be it Smartphone or Tablet or Laptop.

# Installation

Include the js file in your page before ending body tag.

If you are using Bootstrap 2 or Bootstrap 3, you will have to include the css file in your page before ending head tag.

You need to include jquery file in the page for ScaleText to work.

# How to use and why should I use scaleText?

# Easy to implement : 
All you have to do is include scaleText.js in your page. Design your page for a fixed screen size like you usually do, but you don’t have to write any media queries for font-size. Then initialize the plugin for all the elements you want to scale. But please do keep in mind that you have to pass the top level container and the width of it, for which you have designed your page.
<blockquote><strong>Example:</strong>
Top level container for this page is 'body' and  I have designed this page for 1349px.
Now I want to scale all p elements in this page.
<pre>$('p').scaleText( { container : 'body' , initialWidth : 1349  } );</pre>
</blockquote>
# Support for Bootstrap Columns : 
If you are using Bootstrap and you want to scale text which is inside a Bootstrap column, you have to add an extra class <strong>bootscale{version}-{column width}</strong> for those columns and include <strong>scaleText.css</strong> file in the page.
<blockquote><strong>Example:</strong>
<pre>Bootstrap 3:  col-md-2 bootscale3-2</pre>
<pre>Bootstrap 2:  span2 bootscale2-2</pre>
</blockquote>
# Generalized : 
It works for all types of elements, be it table, inline, block, floated or positioned.<br/>Font-size calculation is based directly on the element width ( or width of closest block element in case the element takes only content width) instead of screen width.
# Scaling independent of screen size : 
You can scale anytime you want independent of window’s resize event using the api function <strong>$.scaleText()</strong> . You can pass an element as parameter to this function and it will scale only children of that element. If no parameter is passed it will scale all the elements in the page.
PS: Elements have to be initialized before, for this function to work.
<blockquote><strong>Example:</strong>
<pre>$.scaleText(); / $.scaleText('body');</pre></blockquote>
# API
<table>
   <thead>
     <tr>
       <th>Option</th>
       <th>Default Value</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
        <td>container <span style="color:red">required</span></td>
        <td>'body'</td>
        <td>Top level container for your page.Initializing elements outside this container will throw error.<br/>Accepts jQuery selector string, javascript DOM object, jQuery DOM object</td>
     </tr>
     <tr>
        <td>initialWidth <span style="color:red">required</span></td>
        <td>1366 (in px)</td>
        <td>Width of the top level container when you designed the page (or) the width at which font-sizes you have defined should be applied.<br/> Accepts integer</td>
     </tr>
     <tr>
        <td>minFont</td>
        <td>10 (in px)</td>
        <td>Minimum value for font-size, if the calculated value is less than this value, this value will be set as font-size.<br/> Accepts integer</td>
     </tr>
     <tr>
        <td>maxFont</td>
        <td>999 (in px)</td>
        <td>Maximum value for font-size, if the calculated value is more than this value, this value will be set as font-size.<br/> Accepts integer</td>
     </tr>
    </tbody>
</table>
