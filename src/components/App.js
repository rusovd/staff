// ! TODO: I have too little time for the task, that's why there is no code splitting... So, maybe one day :)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addLine, deleteLine, updateLine, sortLines, fetchLines } from '../actions';

const RoleList = ['Engineer', 'Sales', 'Customer Support', 'Manager'];
const StatusList = ['Screen', 'Scheduled', 'Explored', 'Hire'];

class App extends Component {
  state = {
    role: RoleList[0],
    status: StatusList[0],
    curLine: -1,
    searchFor: ''
  }  

  componentDidMount = () => ( this.fetchLines() );
    
  handleCurLine = id => e => ( this.setState({curLine: id}) );
    
  fetchLines = () => {
      const url = "https://jsonplaceholder.typicode.com/users";
      let lines = [];

      fetch(url, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(json => {
          lines = json.map((line) => {            
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Unfortunately, the fields: Role, ConnectedOn and Status - are not in the response 
            // of the REST-service that I use to simulate receiving data(https://jsonplaceholder.typicode.com/), so 
            // I emulate the missing values based on geodata and a random Date. Whatever :)
            let role = RoleList[Math.round(Math.abs(line.address.geo.lat)) % RoleList.length];
            let status = StatusList[Math.round(Math.abs(line.address.geo.lng)) % StatusList.length];
            let conOn = new Date(+(new Date()) - Math.floor(Math.random()*Math.pow(10,11))).toISOString().slice(0,10);
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            return {...line, role, status, conOn};
          });
          this.props.fetchLines(lines);
        });
    }

  onChange = e => ( this.setState({[e.target.name]: e.target.value}) );
    
  handleSubmit = e => {
    e.preventDefault();

    let name = this.state.name.trim(),
        role = this.state.role.trim(),
        conOn = this.state.conOn.trim(),
        status = this.state.status.trim();


    if(!name || !role || !conOn || !status ) {
      return;
    }

    this.props.addLine(this.state);
    this.clearAddLineFormFields();
  }

  clearAddLineFormFields = () => ( document.getElementById("add-comment-form").reset() );
    
  handleSearch = e => {
    e.preventDefault();

    const { lines } = this.props;
    return this.filterLines(lines);
  }

  multiSearchAnd = (text, searchWords) => (
    searchWords.every((el) => {
      return text.match(new RegExp(el,"i"))
    })
  )

  multiSearchOr = (text, searchWords) => (
    searchWords.some((el) => {
      return text.match(new RegExp(el,"i"))
    })
  )

  concatObjValues = (o) =>  [].concat.apply([], Object.values(o)).join(' ');
  
  filterLines = lines => {    
    if(this.state && this.state.searchFor) {
      let searchFor = this.state.searchFor.trim().toLowerCase();
      const searchProxyF = searchFor.indexOf(' and ') !== -1 ? this.multiSearchAnd : this.multiSearchOr;      
      searchFor = this.replaceByRules(searchFor, { " and ":' ', " or ":' ' }).split(' ');

      return lines.filter(line => {        
        let wholeLine = this.concatObjValues({name: line.name, role: line.role, conOn: line.conOn, status: line.status});
        return searchProxyF(wholeLine, searchFor);
      })
    } else {
      return lines
    }    
  }

  deleteLine = id => e => ( this.props.deleteLine(id) );

  updateLine = line => e => {
    this.props.updateLine({...line, [e.target.name]: e.target.value });
    this.setState({curLine: -1});
  }

  sortLines = (field, order) => e => ( this.props.sortLines(field, order) );
    
  countFreq = (arr, key) => ( arr.reduce((prev, curr) => (prev[curr[key]] = ++prev[curr[key]] || 1, prev), {}) );
  
  objToStr = obj => ( Object.entries(obj).sort().map(x=>x.join(": ")).join(" ,   ") );

  resetSearch = () => ( this.setState({searchFor: '', phrase: ''}) );

  startSearch = () => ( this.setState({searchFor: this.state.phrase}) ); 

  replaceByRules = (str, mapObj) => {
    let re = new RegExp(Object.keys(mapObj).join("|"), "gi");
    return str.replace(re, (matched) => ( mapObj[matched.toLowerCase()] ) ).replace( /\s\s+/g, ' ' );
  }

  createListForReplaces = (arr, begin, end) => (
    arr.reduce( (prev, curr) => ( 
      ( prev[curr] = (begin + curr + end), prev )
    ) , {} )
  )

  highlightTextInGrid = (str, searchFor) => {
    return this.state && this.state.searchFor 
    ?
      this.replaceByRules(str, this.createListForReplaces(searchFor, `<strong style="background-color: #f4d991">`, '</strong>'))
    : 
      str
}

  renderLines = () => {
    let lines = this.filterLines( this.props.lines );
    let stat = this.countFreq(lines, 'status');
    let searchFor = this.replaceByRules( this.state.searchFor.trim().toLowerCase() , { " and ":' ', " or ":' ' }).split(' ') ;

    return (
      <div>
        <div className="pull-left"><span className="label label-primary">{this.objToStr(stat)} &nbsp; | &nbsp; TOTAL: {lines.length} lines</span></div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name &nbsp;
                <a href='#'><i className="fa fa-arrow-up" aria-hidden="true" onClick={ this.sortLines('name', 'asc') }></i></a>
                <a href='#'><i className="fa fa-arrow-down" aria-hidden="true" onClick={ this.sortLines('name', 'desc') }></i></a>
              </th>
              <th>Role &nbsp;
                <a href='#'><i className="fa fa-arrow-up" aria-hidden="true" onClick={ this.sortLines('role', 'asc') }></i></a>
                <a href='#'><i className="fa fa-arrow-down" aria-hidden="true" onClick={ this.sortLines('role', 'desc') }></i></a>
              </th>
              <th>Connected On &nbsp;
                <a href='#'><i className="fa fa-arrow-up" aria-hidden="true" onClick={ this.sortLines('conOn', 'asc') }></i></a>
                <a href='#'><i className="fa fa-arrow-down" aria-hidden="true" onClick={ this.sortLines('conOn', 'desc') }></i></a>
              </th>
              <th>Status &nbsp;
                <a href='#'><i className="fa fa-arrow-up" aria-hidden="true" onClick={ this.sortLines('status', 'asc') }></i></a>
                <a href='#'><i className="fa fa-arrow-down" aria-hidden="true" onClick={ this.sortLines('status', 'desc') }></i></a>
              </th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            { lines.map(line => {
              return (
                
                <tr key={line.id}>
                  {/* <td>{line.name}</td>
                  <td>{line.role}</td>
                  <td>{line.conOn}</td> */}

                  <td>{searchFor.length>0 ? <span dangerouslySetInnerHTML={{__html: this.highlightTextInGrid( line.name, searchFor )}}/> : line.name}</td> 
                  <td>{searchFor.length>0 ? <span dangerouslySetInnerHTML={{__html: this.highlightTextInGrid( line.role, searchFor )}}/> : line.role}</td> 
                  <td>{searchFor.length>0 ? <span dangerouslySetInnerHTML={{__html: this.highlightTextInGrid( line.conOn, searchFor )}}/> : line.conOn}</td> 

                  { this.state.curLine !== line.id 
                    ?
                      <td className="col-md-2" onClick={this.handleCurLine(line.id)}>
                        {searchFor.length>0 ? <span dangerouslySetInnerHTML={{__html: this.highlightTextInGrid( line.status, searchFor )}}/> : line.status}
                      </td>                      
                    :
                      <td className="col-md-2">                      
                        <select style={{padding: 0, height:'100%'}} name="status" className="form-control" defaultValue={line.status} onChange={this.updateLine(line)}>
                          {StatusList.map((val, index) => 
                            <option key={index} value={val}>{val}</option>
                          )}
                        </select>
                      </td>
                  }
                  <td>
                    <button className="btn btn-danger btn-xs" onClick={ this.deleteLine(line.id) }>
                      <i className="fa fa-times" aria-hidden="true" ></i>
                    </button>
                  </td>
                </tr>
              )
              })}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <h3>Staff </h3>
            </div>
            <div className="col-sm-8">
              <div className="form-inline pull-right">
                <div className="form-group">
                  <form onSubmit={this.handleSearch}>
                    <input
                      type="text"
                      name="phrase"
                      className="form-control"
                      placeholder="Search..."
                      onChange={this.onChange}/>

                    <button
                      type="submit"
                      onClick={this.startSearch}
                      className="btn btn-primary"><i className="fa fa-search" aria-hidden="true"></i> Search</button>
                    <button
                      type="reset"
                      onClick={this.resetSearch}
                      className="btn btn-danger"><i className="fa fa-recycle" aria-hidden="true"></i> Reset</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-inline">
            <div className="form-group">
              <form id="add-comment-form" onSubmit={this.handleSubmit}>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name..."
                  required
                  onChange={this.onChange}/>

                <select name="role" className="form-control" value={this.state.role} onChange={this.onChange}>
                  {RoleList.map((val, index) => 
                    <option key={index} value={val}>{val}</option>
                  )}
                </select>

                <input
                  type="date"
                  name="conOn"
                  className="form-control"
                  placeholder="Connected On..."
                  required
                  onChange={this.onChange}/>

                <select name="status" className="form-control" value={this.state.status} onChange={this.onChange}>
                  {StatusList.map((val, index) => 
                    <option key={index} value={val}>{val}</option>
                  )}
                </select>

                <button
                  type="submit"
                  className="btn btn-success"><i className="fa fa-plus" aria-hidden="true"></i> Add Line</button>

              </form>
            </div>
          </div>

          { this.renderLines() }

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({  
  lines: state  
});

const mapDispatchToProps = dispatch => bindActionCreators({addLine, deleteLine, updateLine, sortLines, fetchLines}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
