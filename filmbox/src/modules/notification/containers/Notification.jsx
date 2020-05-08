import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from "redux";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"

import {getMovies} from '../action/Action';

export class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlGetMovie: "http://localhost:8088/mongo?video=",
        }
    }

    componentDidMount(){
        {this.props.getMovies()}
    }

    render() {
    const columns =[
        {
            Header: "User name",
           accessor: "id"
        },
        {
            Header: "Movie Title",
            accessor: "fileName"
        },
        {
            Header: "Link",
            accessor: "videoId",
            sortable: false,
            width: 500,
            maxWidth:500,
        },
        {
            Header: "Number Chunk",
            accessor: "numberOfFiles",
            sortable: false,
            filterable: false
        },
        {
            Header: "Total Size",
            accessor: "totalSizeFile",
            sortable: false,
            filterable: false
        },
        {
            Header: "Action",
            Cell: props =>{
                return (
                    <button className="">Delete</button>
                )
            },
            sortable: false,
            filterable: false,
            width: 80,
            maxWidth:100,
            minWidth:100
        }
    ]
        return(
            <React.Fragment>
               <ReactTable
                columns={columns}
                data={this.props.movies}
                filterable
                defaultPageSize={10}
                noDataText={"Please Wait..."}
               >

               </ReactTable>
            </React.Fragment>
        );
        }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({ getMovies }, dispatch)
    }
}

const mapStateToProps = state => ({
    movies: state.notification.notification.movies
  });
  


  export default 
      connect(mapStateToProps, mapDispatchToProps)
      (Notification)