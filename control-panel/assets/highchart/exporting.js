!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/exporting",["highcharts"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){function e(t,e,n,i){t.hasOwnProperty(e)||(t[e]=i.apply(null,n))}e(t=t?t._modules:{},"modules/full-screen.src.js",[t["parts/Globals.js"]],function(t){(t.FullScreen=function(t){this.init(t.parentNode)}).prototype={init:function(t){var e;t.requestFullscreen?e=t.requestFullscreen():t.mozRequestFullScreen?e=t.mozRequestFullScreen():t.webkitRequestFullscreen?e=t.webkitRequestFullscreen():t.msRequestFullscreen&&(e=t.msRequestFullscreen()),e&&e.catch(function(){alert("Full screen is not supported inside a frame")})}}}),e(t,"mixins/navigation.js",[],function(){return{initUpdate:function(t){t.navigation||(t.navigation={updates:[],update:function(t,e){this.updates.forEach(function(n){n.update.call(n.context,t,e)})}})},addUpdate:function(t,e){e.navigation||this.initUpdate(e),e.navigation.updates.push({update:t,context:e})}}}),e(t,"modules/exporting.src.js",[t["parts/Globals.js"],t["parts/Utilities.js"],t["mixins/navigation.js"]],function(t,e,n){var i=e.discardElement,o=e.extend,r=e.isObject,s=e.objectEach,a=e.pick;e=t.defaultOptions;var l=t.doc,p=t.Chart,c=t.addEvent,u=t.removeEvent,d=t.fireEvent,h=t.createElement,f=t.css,g=t.merge,m=t.isTouchDevice,x=t.win,y=x.navigator.userAgent,v=t.SVGRenderer,b=t.Renderer.prototype.symbols,w=/Edge\/|Trident\/|MSIE /.test(y),S=/firefox/i.test(y);o(e.lang,{viewFullscreen:"View in full screen",printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"}),e.navigation||(e.navigation={}),g(!0,e.navigation,{buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}}),g(!0,e.navigation,{menuStyle:{border:"1px solid #999999",background:"#ffffff",padding:"5px 0"},menuItemStyle:{padding:"0.5em 1em",color:"#333333",background:"none",fontSize:m?"14px":"11px",transition:"background 250ms, color 250ms"},menuItemHoverStyle:{background:"#335cad",color:"#ffffff"},buttonOptions:{symbolFill:"#666666",symbolStroke:"#666666",symbolStrokeWidth:3,theme:{padding:5}}}),e.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",titleKey:"contextButtonTitle",menuItems:"viewFullscreen printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")}},menuItemDefinitions:{viewFullscreen:{textKey:"viewFullscreen",onclick:function(){this.fullscreen=new t.FullScreen(this.container)}},printChart:{textKey:"printChart",onclick:function(){this.print()}},separator:{separator:!0},downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChart()}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},downloadSVG:{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}}},t.post=function(t,e,n){var o=h("form",g({method:"post",action:t,enctype:"multipart/form-data"},n),{display:"none"},l.body);s(e,function(t,e){h("input",{type:"hidden",name:e,value:t},null,o)}),o.submit(),i(o)},t.isSafari&&t.win.matchMedia("print").addListener(function(e){t.printingChart&&(e.matches?t.printingChart.beforePrint():t.printingChart.afterPrint())}),o(p.prototype,{sanitizeSVG:function(t,e){var n=t.indexOf("</svg>")+6,i=t.substr(n);return t=t.substr(0,n),e&&e.exporting&&e.exporting.allowHTML&&i&&(i='<foreignObject x="0" y="0" width="'+e.chart.width+'" height="'+e.chart.height+'"><body xmlns="http://www.w3.org/1999/xhtml">'+i+"</body></foreignObject>",t=t.replace("</svg>",i+"</svg>")),t=t.replace(/zIndex="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(.*?)("|&quot;);?\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (|NS[0-9]+:)href=/g," xlink:href=").replace(/\n/," ").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g," ").replace(/&shy;/g,"­"),this.ieSanitizeSVG&&(t=this.ieSanitizeSVG(t)),t},getChartHTML:function(){return this.styledMode&&this.inlineStyles(),this.container.innerHTML},getSVG:function(e){var n,r=g(this.options,e);r.plotOptions=g(this.userOptions.plotOptions,e&&e.plotOptions),r.time=g(this.userOptions.time,e&&e.time);var s=h("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},l.body),a=this.renderTo.style.width,p=this.renderTo.style.height;a=r.exporting.sourceWidth||r.chart.width||/px$/.test(a)&&parseInt(a,10)||(r.isGantt?800:600),p=r.exporting.sourceHeight||r.chart.height||/px$/.test(p)&&parseInt(p,10)||400,o(r.chart,{animation:!1,renderTo:s,forExport:!0,renderer:"SVGRenderer",width:a,height:p}),r.exporting.enabled=!1,delete r.data,r.series=[],this.series.forEach(function(t){(n=g(t.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:t.visible})).isInternal||r.series.push(n)}),this.axes.forEach(function(e){e.userOptions.internalKey||(e.userOptions.internalKey=t.uniqueKey())});var c=new t.Chart(r,this.callback);return e&&["xAxis","yAxis","series"].forEach(function(t){var n={};e[t]&&(n[t]=e[t],c.update(n))}),this.axes.forEach(function(e){var n=t.find(c.axes,function(t){return t.options.internalKey===e.userOptions.internalKey}),i=e.getExtremes(),o=i.userMin;i=i.userMax,n&&(void 0!==o&&o!==n.min||void 0!==i&&i!==n.max)&&n.setExtremes(o,i,!0,!1)}),a=c.getChartHTML(),d(this,"getSVG",{chartCopy:c}),a=this.sanitizeSVG(a,r),r=null,c.destroy(),i(s),a},getSVGForExport:function(t,e){var n=this.options.exporting;return this.getSVG(g({chart:{borderRadius:0}},n.chartOptions,e,{exporting:{sourceWidth:t&&t.sourceWidth||n.sourceWidth,sourceHeight:t&&t.sourceHeight||n.sourceHeight}}))},getFilename:function(){var t=this.userOptions.title&&this.userOptions.title.text,e=this.options.exporting.filename;return e?e.replace(/\//g,"-"):("string"==typeof t&&(e=t.toLowerCase().replace(/<\/?[^>]+(>|$)/g,"").replace(/[\s_]+/g,"-").replace(/[^a-z0-9\-]/g,"").replace(/^[\-]+/g,"").replace(/[\-]+/g,"-").substr(0,24).replace(/[\-]+$/g,"")),(!e||5>e.length)&&(e="chart"),e)},exportChart:function(e,n){n=this.getSVGForExport(e,n),e=g(this.options.exporting,e),t.post(e.url,{filename:e.filename?e.filename.replace(/\//g,"-"):this.getFilename(),type:e.type,width:e.width||0,scale:e.scale,svg:n},e.formAttributes)},moveContainers:function(t){(this.fixedDiv?[this.fixedDiv,this.scrollingContainer]:[this.container]).forEach(function(e){t.appendChild(e)})},beforePrint:function(){var t=l.body,e=this.options.exporting.printMaxWidth,n={childNodes:t.childNodes,origDisplay:[],resetParams:void 0};this.isPrinting=!0,this.pointer.reset(null,0),d(this,"beforePrint"),e&&this.chartWidth>e&&(n.resetParams=[this.options.chart.width,void 0,!1],this.setSize(e,void 0,!1)),[].forEach.call(n.childNodes,function(t,e){1===t.nodeType&&(n.origDisplay[e]=t.style.display,t.style.display="none")}),this.moveContainers(t),this.printReverseInfo=n},afterPrint:function(){if(this.printReverseInfo){var e=this.printReverseInfo.childNodes,n=this.printReverseInfo.origDisplay,i=this.printReverseInfo.resetParams;this.moveContainers(this.renderTo),[].forEach.call(e,function(t,e){1===t.nodeType&&(t.style.display=n[e]||"")}),this.isPrinting=!1,i&&this.setSize.apply(this,i),delete this.printReverseInfo,delete t.printingChart,d(this,"afterPrint")}},print:function(){var e=this;e.isPrinting||(t.printingChart=e,t.isSafari||e.beforePrint(),setTimeout(function(){x.focus(),x.print(),t.isSafari||setTimeout(function(){e.afterPrint()},1e3)},1))},contextMenu:function(e,n,i,s,a,p,u){var g=this,m=g.options.navigation,y=g.chartWidth,v=g.chartHeight,b="cache-"+e,w=g[b],S=Math.max(a,p);if(!w){g.exportContextMenu=g[b]=w=h("div",{className:e},{position:"absolute",zIndex:1e3,padding:S+"px",pointerEvents:"auto"},g.fixedDiv||g.container);var E=h("ul",{className:"highcharts-menu"},{listStyle:"none",margin:0,padding:0},w);g.styledMode||f(E,o({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},m.menuStyle)),w.hideMenu=function(){f(w,{display:"none"}),u&&u.setState(0),g.openMenu=!1,f(g.renderTo,{overflow:"hidden"}),t.clearTimeout(w.hideTimer),d(g,"exportMenuHidden")},g.exportEvents.push(c(w,"mouseleave",function(){w.hideTimer=x.setTimeout(w.hideMenu,500)}),c(w,"mouseenter",function(){t.clearTimeout(w.hideTimer)}),c(l,"mouseup",function(t){g.pointer.inClass(t.target,e)||w.hideMenu()}),c(w,"click",function(){g.openMenu&&w.hideMenu()})),n.forEach(function(t){if("string"==typeof t&&(t=g.options.exporting.menuItemDefinitions[t]),r(t,!0)){if(t.separator)var e=h("hr",null,null,E);else e=h("li",{className:"highcharts-menu-item",onclick:function(e){e&&e.stopPropagation(),w.hideMenu(),t.onclick&&t.onclick.apply(g,arguments)},innerHTML:t.text||g.options.lang[t.textKey]},null,E),g.styledMode||(e.onmouseover=function(){f(this,m.menuItemHoverStyle)},e.onmouseout=function(){f(this,m.menuItemStyle)},f(e,o({cursor:"pointer"},m.menuItemStyle)));g.exportDivElements.push(e)}}),g.exportDivElements.push(E,w),g.exportMenuWidth=w.offsetWidth,g.exportMenuHeight=w.offsetHeight}n={display:"block"},i+g.exportMenuWidth>y?n.right=y-i-a-S+"px":n.left=i-S+"px",s+p+g.exportMenuHeight>v&&"top"!==u.alignOptions.verticalAlign?n.bottom=v-s-S+"px":n.top=s+p-S+"px",f(w,n),f(g.renderTo,{overflow:""}),g.openMenu=!0,d(g,"exportMenuShown")},addButton:function(t){var e=this,n=e.renderer,i=g(e.options.navigation.buttonOptions,t),r=i.onclick,s=i.menuItems,l=i.symbolSize||12;if(e.btnCount||(e.btnCount=0),e.exportDivElements||(e.exportDivElements=[],e.exportSVGElements=[]),!1!==i.enabled){var p,c=i.theme,u=c.states,d=u&&u.hover;u=u&&u.select,e.styledMode||(c.fill=a(c.fill,"#ffffff"),c.stroke=a(c.stroke,"none")),delete c.states,r?p=function(t){t&&t.stopPropagation(),r.call(e,t)}:s&&(p=function(t){t&&t.stopPropagation(),e.contextMenu(h.menuClassName,s,h.translateX,h.translateY,h.width,h.height,h),h.setState(2)}),i.text&&i.symbol?c.paddingLeft=a(c.paddingLeft,25):i.text||o(c,{width:i.width,height:i.height,padding:0}),e.styledMode||(c["stroke-linecap"]="round",c.fill=a(c.fill,"#ffffff"),c.stroke=a(c.stroke,"none"));var h=n.button(i.text,0,0,p,c,d,u).addClass(t.className).attr({title:a(e.options.lang[i._titleKey||i.titleKey],"")});if(h.menuClassName=t.menuClassName||"highcharts-menu-"+e.btnCount++,i.symbol){var f=n.symbol(i.symbol,i.symbolX-l/2,i.symbolY-l/2,l,l,{width:l,height:l}).addClass("highcharts-button-symbol").attr({zIndex:1}).add(h);e.styledMode||f.attr({stroke:i.symbolStroke,fill:i.symbolFill,"stroke-width":i.symbolStrokeWidth||1})}h.add(e.exportingGroup).align(o(i,{width:h.width,x:a(i.x,e.buttonOffset)}),!0,"spacingBox"),e.buttonOffset+=(h.width+i.buttonSpacing)*("right"===i.align?-1:1),e.exportSVGElements.push(h,f)}},destroyExport:function(e){var n=e?e.target:this;e=n.exportSVGElements;var o,r=n.exportDivElements,s=n.exportEvents;e&&(e.forEach(function(t,e){t&&(t.onclick=t.ontouchstart=null,o="cache-"+t.menuClassName,n[o]&&delete n[o],n.exportSVGElements[e]=t.destroy())}),e.length=0),n.exportingGroup&&(n.exportingGroup.destroy(),delete n.exportingGroup),r&&(r.forEach(function(e,o){t.clearTimeout(e.hideTimer),u(e,"mouseleave"),n.exportDivElements[o]=e.onmouseout=e.onmouseover=e.ontouchstart=e.onclick=null,i(e)}),r.length=0),s&&(s.forEach(function(t){t()}),s.length=0)}}),v.prototype.inlineToAttributes="fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" "),v.prototype.inlineBlacklist=[/-/,/^(clipPath|cssText|d|height|width)$/,/^font$/,/[lL]ogical(Width|Height)$/,/perspective/,/TapHighlightColor/,/^transition/,/^length$/],v.prototype.unstyledElements=["clipPath","defs","desc"],p.prototype.inlineStyles=function(){function t(t){return t.replace(/([A-Z])/g,function(t,e){return"-"+e.toLowerCase()})}var e,n=this.renderer,i=n.inlineToAttributes,o=n.inlineBlacklist,r=n.inlineWhitelist,a=n.unstyledElements,p={};n=l.createElement("iframe"),f(n,{width:"1px",height:"1px",visibility:"hidden"}),l.body.appendChild(n);var c=n.contentWindow.document;c.open(),c.write('<svg xmlns="http://www.w3.org/2000/svg"></svg>'),c.close(),function n(l){function u(e,n){if(d=h=!1,r){for(f=r.length;f--&&!h;)h=r[f].test(n);d=!h}for("transform"===n&&"none"===e&&(d=!0),f=o.length;f--&&!d;)d=o[f].test(n)||"function"==typeof e;d||v[n]===e&&"svg"!==l.nodeName||p[l.nodeName][n]===e||(-1!==i.indexOf(n)?l.setAttribute(t(n),e):m+=t(n)+":"+e+";")}var d,h,f,m="";if(1===l.nodeType&&-1===a.indexOf(l.nodeName)){var y=x.getComputedStyle(l,null),v="svg"===l.nodeName?{}:x.getComputedStyle(l.parentNode,null);if(!p[l.nodeName]){e=c.getElementsByTagName("svg")[0];var b=c.createElementNS(l.namespaceURI,l.nodeName);e.appendChild(b),p[l.nodeName]=g(x.getComputedStyle(b,null)),"text"===l.nodeName&&delete p.text.fill,e.removeChild(b)}if(S||w)for(var E in y)u(y[E],E);else s(y,u);m&&(y=l.getAttribute("style"),l.setAttribute("style",(y?y+";":"")+m)),"svg"===l.nodeName&&l.setAttribute("stroke-width","1px"),"text"!==l.nodeName&&[].forEach.call(l.children||l.childNodes,n)}}(this.container.querySelector("svg")),e.parentNode.removeChild(e)},b.menu=function(t,e,n,i){return["M",t,e+2.5,"L",t+n,e+2.5,"M",t,e+i/2+.5,"L",t+n,e+i/2+.5,"M",t,e+i-1.5,"L",t+n,e+i-1.5]},b.menuball=function(t,e,n,i){return i=i/3-2,[].concat(this.circle(n-i,e,i,i),this.circle(n-i,e+i+4,i,i),this.circle(n-i,e+2*(i+4),i,i))},p.prototype.renderExporting=function(){var t=this,e=t.options.exporting,n=e.buttons,i=t.isDirtyExporting||!t.exportSVGElements;t.buttonOffset=0,t.isDirtyExporting&&t.destroyExport(),i&&!1!==e.enabled&&(t.exportEvents=[],t.exportingGroup=t.exportingGroup||t.renderer.g("exporting-group").attr({zIndex:3}).add(),s(n,function(e){t.addButton(e)}),t.isDirtyExporting=!1),c(t,"destroy",t.destroyExport)},c(p,"init",function(){var t=this;t.exporting={update:function(e,n){t.isDirtyExporting=!0,g(!0,t.options.exporting,e),a(n,!0)&&t.redraw()}},n.addUpdate(function(e,n){t.isDirtyExporting=!0,g(!0,t.options.navigation,e),a(n,!0)&&t.redraw()},t)}),p.prototype.callbacks.push(function(t){t.renderExporting(),c(t,"redraw",t.renderExporting)})}),e(t,"masters/modules/exporting.src.js",[],function(){})});