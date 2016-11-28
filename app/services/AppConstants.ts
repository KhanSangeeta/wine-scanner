/*import {LoginPage} from '../pages/login/login';
import { MyPosts } from '../pages/myposts/myposts';
import { CreatePost } from '../pages/createpost/createpost';
import { Profile } from '../pages/profile/profile';
declare var ape_config ;

export class AppConstants {
	
	private static API_ENDPOINT = ape_config.api_end_point;//"http://fortune.contributors.news";//'http://fortune.ticp.fortune.engineering/';
    

	static get API(): any {
		return {
			authenticate: this.API_ENDPOINT+'?oauth=token',
			posts : this.API_ENDPOINT+'/wp-json/ticp/v1/',
            postToken:'/wp-json/ticp/v1/posts',
            brandLists : this.API_ENDPOINT + '/wp-json/ticp/v1/me',
			uploadFeaturedImageUrl : this.API_ENDPOINT+'/wp-json/ticp/v1/media',
		}
	}

	static get URL(): any {
		return {
			forgot: ape_config.website_url+'/wp-login.php?action=lostpassword',
			signup: ape_config.website_url,
			myAccount : ape_config.api_end_point+'/wp-admin/profile.php',
			feedback: 'mailto:springboardsupport@timeinc.com',	
	}

	}
	/*static get navPages(): Array<{title: string, component: any,icon :any}> {
		return [
		      { title: 'My Posts', component: MyPosts , icon :'book'},
		      { title: 'New Post', component: CreatePost, icon : 'create' },
		      { title: 'Profile', component: Profile, icon : 'person' },
		      { title: 'Logout', component: LoginPage, icon : 'log-out' }
		]
	}*/
	

/*	static get statusMap() : any {
		return {
		    'publish' : 'Published',
		    'future' : 'Future',
		    'draft' : 'Draft',
		    'pending' : 'Pending',
		    'private' : 'Private',
		    'trash' : 'Deleted',
		    'auto-draft' : 'Auto-draft',
		    'inherit' :'Inherit'
		  }
	}

    static get maxCharacters() :any{
        return 2048;
    }
}*/