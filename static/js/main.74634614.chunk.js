(window.webpackJsonpstaff=window.webpackJsonpstaff||[]).push([[0],{18:function(e,t,n){e.exports=n(32)},32:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(5),o=n.n(c),l=n(6),s=n(3),i=n(15),u=n(4);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var d=function(e){return{id:+new Date+Math.random(),name:e.name,role:e.role,status:e.status,conOn:new Date(e.conOn).toISOString().slice(0,10)}},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return e.filter(function(e){return e.id!==t})},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0,a=e.slice();return a.sort(function(e,a){return e[t]<a[t]?"asc"===n?-1:1:e[t]>a[t]?"asc"===n?1:-1:0}),a},p=function(e,t){return e.map(function(e){return e.id===t.id?function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(n,!0).forEach(function(t){Object(u.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},e,{status:t.status}):e})},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_LINES":return t.lines;case"ADD_LINE":return[d(t)].concat(Object(i.a)(e));case"DELETE_LINE":return f(e,t.id);case"UPDATE_LINE":return p(e,t);case"SORT_LINES":return h(e,t.field,t.order);default:return e}},g=(n(30),n(31),n(12)),O=n(13),b=n(16),L=n(14),y=n(17),v=function(e){return{type:"ADD_LINE",name:e.name,role:e.role,conOn:e.conOn,status:e.status}},N=function(e){return{type:"DELETE_LINE",id:e}},S=function(e){return{type:"UPDATE_LINE",id:e.id,name:e.name,role:e.role,conOn:e.conOn,status:e.status}},w=function(e,t){return{type:"SORT_LINES",field:e,order:t}},j=function(e){return{type:"FETCH_LINES",lines:e}};function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(n,!0).forEach(function(t){Object(u.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var D=["Engineer","Sales","Customer Support","Manager"],T=["Screen","Scheduled","Explored","Hire"],I=function(e){function t(){var e,n;Object(g.a)(this,t);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(n=Object(b.a)(this,(e=Object(L.a)(t)).call.apply(e,[this].concat(c)))).state={role:D[0],status:T[0],curLine:-1,searchFor:""},n.componentDidMount=function(){return n.fetchLines()},n.handleCurLine=function(e){return function(t){return n.setState({curLine:e})}},n.fetchLines=function(){var e=[];fetch("https://jsonplaceholder.typicode.com/users",{method:"GET"}).then(function(e){return e.json()}).then(function(t){e=t.map(function(e){return _({},e,{role:D[Math.round(Math.abs(e.address.geo.lat))%D.length],status:T[Math.round(Math.abs(e.address.geo.lng))%T.length],conOn:new Date(+new Date-Math.floor(Math.random()*Math.pow(10,11))).toISOString().slice(0,10)})}),n.props.fetchLines(e)})},n.onChange=function(e){return n.setState(Object(u.a)({},e.target.name,e.target.value))},n.handleSubmit=function(e){e.preventDefault();var t=n.state.name.trim(),a=n.state.role.trim(),r=n.state.conOn.trim(),c=n.state.status.trim();t&&a&&r&&c&&(n.props.addLine(n.state),n.clearAddLineFormFields())},n.clearAddLineFormFields=function(){return document.getElementById("add-comment-form").reset()},n.handleSearch=function(e){e.preventDefault();var t=n.props.lines;return n.filterLines(t)},n.multiSearchAnd=function(e,t){return t.every(function(t){return e.match(new RegExp(t,"i"))})},n.multiSearchOr=function(e,t){return t.some(function(t){return e.match(new RegExp(t,"i"))})},n.concatObjValues=function(e){return[].concat.apply([],Object.values(e)).join(" ")},n.filterLines=function(e){if(n.state&&n.state.searchFor){var t=n.state.searchFor.trim().toLowerCase(),a=-1!==t.indexOf(" and ")?n.multiSearchAnd:n.multiSearchOr;return t=n.replaceByRules(t,{" and ":" "," or ":" "}).split(" "),e.filter(function(e){var r=n.concatObjValues({name:e.name,role:e.role,conOn:e.conOn,status:e.status});return a(r,t)})}return e},n.deleteLine=function(e){return function(t){return n.props.deleteLine(e)}},n.updateLine=function(e){return function(t){n.props.updateLine(_({},e,Object(u.a)({},t.target.name,t.target.value))),n.setState({curLine:-1})}},n.sortLines=function(e,t){return function(a){return n.props.sortLines(e,t)}},n.countFreq=function(e,t){return e.reduce(function(e,n){return e[n[t]]=++e[n[t]]||1,e},{})},n.objToStr=function(e){return Object.entries(e).sort().map(function(e){return e.join(": ")}).join(" ,   ")},n.resetSearch=function(){return n.setState({searchFor:"",phrase:""})},n.startSearch=function(){return n.setState({searchFor:n.state.phrase})},n.replaceByRules=function(e,t){var n=new RegExp(Object.keys(t).join("|"),"gi");return e.replace(n,function(e){return t[e.toLowerCase()]}).replace(/\s\s+/g," ")},n.createListForReplaces=function(e,t,n){return e.reduce(function(e,a,r){return e[a]=t+a+n,e},{})},n.highlightTextInGrid=function(e,t){return console.log(n.createListForReplaces(t,'<strong style="background-color: #f4d991">',"</strong>")),n.state&&n.state.searchFor?n.replaceByRules(e,n.createListForReplaces(t,'<strong style="background-color: #f4d991">',"</strong>")):e},n.renderLines=function(){var e=n.filterLines(n.props.lines),t=n.countFreq(e,"status"),a=n.replaceByRules(n.state.searchFor.trim().toLowerCase(),{" and ":" "," or ":" "}).split(" ");return r.a.createElement("div",null,r.a.createElement("div",{className:"pull-left"},r.a.createElement("span",{className:"label label-primary"},n.objToStr(t)," \xa0 | \xa0 TOTAL: ",e.length," lines")),r.a.createElement("table",{className:"table table-hover"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name \xa0",r.a.createElement("a",{href:"#"},r.a.createElement("i",{className:"fa fa-arrow-up","aria-hidden":"true",onClick:n.sortLines("name","asc")})),r.a.createElement("a",{href:"#"},r.a.createElement("i",{className:"fa fa-arrow-down","aria-hidden":"true",onClick:n.sortLines("name","desc")}))),r.a.createElement("th",null,"Role \xa0",r.a.createElement("a",{href:"#"},r.a.createElement("i",{className:"fa fa-arrow-up","aria-hidden":"true",onClick:n.sortLines("role","asc")})),r.a.createElement("a",{href:"#"},r.a.createElement("i",{className:"fa fa-arrow-down","aria-hidden":"true",onClick:n.sortLines("role","desc")}))),r.a.createElement("th",null,"Connected On \xa0",r.a.createElement("a",{href:"#"},r.a.createElement("i",{className:"fa fa-arrow-up","aria-hidden":"true",onClick:n.sortLines("conOn","asc")})),r.a.createElement("a",{href:"#"},r.a.createElement("i",{className:"fa fa-arrow-down","aria-hidden":"true",onClick:n.sortLines("conOn","desc")}))),r.a.createElement("th",null,"Status \xa0",r.a.createElement("a",{href:"#"},r.a.createElement("i",{className:"fa fa-arrow-up","aria-hidden":"true",onClick:n.sortLines("status","asc")})),r.a.createElement("a",{href:"#"},r.a.createElement("i",{className:"fa fa-arrow-down","aria-hidden":"true",onClick:n.sortLines("status","desc")}))),r.a.createElement("th",null,"Delete"))),r.a.createElement("tbody",null,e.map(function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,a.length>0?r.a.createElement("span",{dangerouslySetInnerHTML:{__html:n.highlightTextInGrid(e.name,a)}}):e.name),r.a.createElement("td",null,a.length>0?r.a.createElement("span",{dangerouslySetInnerHTML:{__html:n.highlightTextInGrid(e.role,a)}}):e.role),r.a.createElement("td",null,a.length>0?r.a.createElement("span",{dangerouslySetInnerHTML:{__html:n.highlightTextInGrid(e.conOn,a)}}):e.conOn),n.state.curLine!==e.id?r.a.createElement("td",{className:"col-md-2",onClick:n.handleCurLine(e.id)},a.length>0?r.a.createElement("span",{dangerouslySetInnerHTML:{__html:n.highlightTextInGrid(e.status,a)}}):e.status):r.a.createElement("td",{className:"col-md-2"},r.a.createElement("select",{style:{padding:0,height:"100%"},name:"status",className:"form-control",defaultValue:e.status,onChange:n.updateLine(e)},T.map(function(e,t){return r.a.createElement("option",{key:t,value:e},e)}))),r.a.createElement("td",null,r.a.createElement("button",{className:"btn btn-danger btn-xs",onClick:n.deleteLine(e.id)},r.a.createElement("i",{className:"fa fa-times","aria-hidden":"true"}))))}))))},n}return Object(y.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("h3",null,"Staff ")),r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("div",{className:"form-inline pull-right"},r.a.createElement("div",{className:"form-group"},r.a.createElement("form",{onSubmit:this.handleSearch},r.a.createElement("input",{type:"text",name:"phrase",className:"form-control",placeholder:"Search...",onChange:this.onChange}),r.a.createElement("button",{type:"submit",onClick:this.startSearch,className:"btn btn-primary"},r.a.createElement("i",{className:"fa fa-search","aria-hidden":"true"})," Search"),r.a.createElement("button",{type:"reset",onClick:this.resetSearch,className:"btn btn-danger"},r.a.createElement("i",{className:"fa fa-recycle","aria-hidden":"true"})," Reset")))))),r.a.createElement("div",{className:"form-inline"},r.a.createElement("div",{className:"form-group"},r.a.createElement("form",{id:"add-comment-form",onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",name:"name",className:"form-control",placeholder:"Name...",required:!0,onChange:this.onChange}),r.a.createElement("select",{name:"role",className:"form-control",value:this.state.role,onChange:this.onChange},D.map(function(e,t){return r.a.createElement("option",{key:t,value:e},e)})),r.a.createElement("input",{type:"date",name:"conOn",className:"form-control",placeholder:"Connected On...",required:!0,onChange:this.onChange}),r.a.createElement("select",{name:"status",className:"form-control",value:this.state.status,onChange:this.onChange},T.map(function(e,t){return r.a.createElement("option",{key:t,value:e},e)})),r.a.createElement("button",{type:"submit",className:"btn btn-success"},r.a.createElement("i",{className:"fa fa-plus","aria-hidden":"true"})," Add Line")))),this.renderLines()))}}]),t}(a.Component),k=Object(l.b)(function(e){return{lines:e}},function(e){return Object(s.a)({addLine:v,deleteLine:N,updateLine:S,sortLines:w,fetchLines:j},e)})(I),F=Object(s.b)(E,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());o.a.render(r.a.createElement(l.a,{store:F},r.a.createElement(k,null)),window.document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.74634614.chunk.js.map