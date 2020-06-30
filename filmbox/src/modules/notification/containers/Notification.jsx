import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from "redux";
import ReactTable from "react-table-6";
import {GET} from '../../common/utils';
import "react-table-6/react-table.css"

import {getMovies, getAllIdChunck} from '../action/Action';
import Navigation from '../../navigation/Navigation'

export class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlGetMovie: "http://localhost:8088/mongo?video=",
            userName: null
        }
    }

    componentDidMount(){
        {this.props.getMovies()}
    }

    getUserInfoById = (id) => {
        console.log("id ->",id)
         GET(`http://localhost:8091/user/${id}/profile`)
          .then(response => { 
           console.log(response.data.name)
           this.state.userName=response.data.name
           console.log(this.state.userName)
          })
          .catch(err => {
            console.log(err);
          });
    }

    setVideoId = (data) =>{
        console.log("notification", data);
        const words = data.split('video=');
        this.props.getAllIdChunck(words[1],this.props);    
    }
    
    render() {
    const columns =[
        {
            Header: "User name",
            Cell: props =>{
                this.getUserInfoById(props.original.id)
                return(
                    <div>{console.log(this.state.userName)}</div>
                )
            }    
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
            filterable: false,
            width: 30,
            maxWidth:30,
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
                    <div>  
                        <button className="" onClick={()=>this.setVideoId(props.original.videoId)}>View</button>
                    </div>
                )
            },
            sortable: false,
            filterable: false,
            width: 100,
            maxWidth:100,
            minWidth:100
        }
    ]
        return(
            <React.Fragment>
                <Navigation />
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
        ...bindActionCreators({ getMovies, getAllIdChunck}, dispatch)
    }
}

const mapStateToProps = state => ({
    movies: state.notification.notification.movies
  });
  


export default 
    connect(mapStateToProps, mapDispatchToProps)
    (Notification)