import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAKtB-HlClVEnJqCBs04Em7OFyI7rHoA4o';



class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            videos: [],
            selectedVideo: null
         };

         this.videoSearch('league of legends');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
        this.setState({ 
            videos: videos,
            selectedVideo: videos[0]
        });
       //this.setState({ videos: videos}); only works when the key and variable
       // are the same variable name
    });
}
    


    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);


        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                videos={this.state.videos}/> {/*passing props videos to video_list*/}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));