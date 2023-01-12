import React,{useState,useEffect} from 'react'
import {Container, Grow,Grid, Paper,AppBar, TextField,Button} from '@material-ui/core';
import Posts from '../Posts/Posts'
import Form from '../Form/Form';
import useStyles from './styles'
import { useDispatch } from "react-redux";
import {getPosts,getPostsBySearch} from '../../actions/posts'
import Pagination from '../pagination';
import { useNavigate,useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'


function useQuery(){
    return new URLSearchParams(useLocation().search)
}
export const Home = () => {
    const query=useQuery()
    const navigate=useNavigate()
    const page=query.get('page') ||1
    const searchQuery=query.get('searchQuery')
    const [search,setSearch]=useState('')
    const [tags,setTags]=useState([])

    const [currentId,setCurrentId]=useState(null);
    const classes=useStyles();
    const dispatch=useDispatch();

    // useEffect(()=>{
    //     dispatch(getPosts());
    // },[currentId,dispatch])

    const searchPost=()=>{
        if(search.trim() || tags){
            //console.log("searchPost");
            //dispatch -> fetch search post
            dispatch(getPostsBySearch({search,tags:tags.join(',')}))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            navigate('/')
        }
       }
   const handleKeyPress=(e)=>{
    if(e.keyCode===13){
        //search for post
        searchPost()
    }

   }
   const handleAdd=(tag)=> setTags([...tags,tag])
   const handleDelete=(tagToDelete)=> setTags(tags.filter((tag)=>tag!==tagToDelete))
  
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container jusftify="space-between" className={classes.gridContainer} alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" onKeyPress={handleKeyPress} variant='outlined' label="Search Memories" fullWidth value={search} onChange= {(e)=>setSearch(e.target.value)} />
                            <ChipInput
                                style={{margin:'10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button variant='contained' onClick={searchPost} className={classes.searchButton} color="primary">
                                Search
                            </Button>
                            
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length)&&(
                            <Paper className={classes.pagination} elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                        )}
                        
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}
export default Home;