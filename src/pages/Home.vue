<template>
	<div @click="colseMouse" class="container1">
	<el-row  class="container" >
		<el-col class="header">
		<el-row :gutter="10">
            <el-col :xs="19" :sm="19" :md="19" :lg="19" ><img src="../assets/logo.jpg"></el-col>
            <el-col :xs="5" :sm="5" :md="5" :lg="5"><div  >
				<el-row>
					<el-col :span="8"   >
	             <userm></userm>
	              </el-col>
			<el-col :span="8">
			 <fixpass></fixpass>
			</el-col>
			<el-col :span="8" class="userinfo">
				<el-button type="text"  @click.native="logout" class="hidden-md-and-down">退出登录</el-button>
				<el-button type="text"  @click.native="logout" class="hidden-lg-and-up"><i class="el-icon-circle-close"></i></el-button>
			</el-col>
				</el-row>
				<el-row>
		  	<el-col :span="8">
			 <myfavorite ></myfavorite>
			</el-col>
				<el-col :span="8"   >
	             <share></share>
	              </el-col>
				  <el-col :span="8">
			 <concern ></concern>
			</el-col>
				</el-row>
			</div></el-col>
        </el-row>
		</el-col>
		<el-col class="nav"  >
			<menut1 class="hidden-md-and-up"  v-on:loginmenu="loginmenu"></menut1>
			<menut class="hidden-sm-and-down" v-on:loginmenu="loginmenu"></menut>
		</el-col>
			<el-col  class="hidden-md-and-up">
			<na1 ></na1>
		   </el-col>
		   <el-col class="backOrahead">
			<na class="hidden-sm-and-down" ></na>
		   </el-col>
		<el-col class="buttonGroup">
<menub v-on:loginmenu="loginmenu"  ></menub>
		</el-col>
		<el-col class="hidden-md-and-up">
         <el-col :sm="24" :md="19" :lg="15" >
			<section class="content-container1" >
				<div  >
					<el-col  class="content-wrapper">
						<mentm1  v-on:loginmenu="loginmenu"   :message="message"  ></mentm1>
					</el-col>
				</div>
			</section>
			</el-col>
		</el-col>
		<el-col  class="hidden-sm-and-down">
		<el-col  class="main">
			<el-col :md="4" :lg="4" >
	<leftm class="leftTree" :message="message" ></leftm>
			</el-col>
			<el-col :sm="24" :md="15" :lg="15" >
			<section class="content-container" @contextmenu="rightmouse">
				<div  >
					<el-col  class="content-wrapper">
						<mentm  v-on:loginmenu="loginmenu"   :message="message"  ></mentm>
					</el-col>
				</div>
			</section>
			</el-col>
			<el-col :md="5" :lg="5"  >
		<rprogress class="rightProgress"></rprogress>
			</el-col>
		</el-col>
		</el-col>
		<div v-show="mouseShow"  style="width: 200px;top: 0px; left: 0px; position: absolute;"  ref="abc">
			<el-row ><button  class="buttons" @click="refre">刷新</button></el-row>
			<el-row ><button  class="buttons" @click="newOne">新建</button></el-row>
            <el-row ><button  class="buttons" @click="copy">复制</button></el-row>
            <el-row ><button  class="buttons" @click="paste">粘贴</button></el-row>
			<el-row ><button  class="buttons" @click="download">下载</button></el-row>
			<el-row ><button  class="buttons" @click="moveUP">上移</button></el-row>
            <el-row ><button  class="buttons" @click="moveDown">下移</button></el-row>
		</div>
	</el-row>
	</div>
</template>
<script>
import Bus from '../test2/Bus'
import menu_top1 from '../test2/menu_top/menu_top1'
import menu_top from '../test2/menu_top/menu_top'
import main_menu from '../test2/main_menu/main_menu'
import main_menu1 from '../test2/main_menu/main_menu1'
import menu_button from '../test2/menu_button/menu_button'
import concern from '../test2/concern/myconcern'
import left_menu from '../test2/left_menu/left_menu'
import user_manage from '../test2/user_manage/user_manage'
import nav from '../test2/nav'
import nav1 from '../test2/nav1'
import favorite from '../test2/favorite'
import share from '../test2/share/share'
// import group from '../test2/share/choose_group/choose_group'
import right_progress from '../test2/right_progress/right_progress'
import fixpassword from '../test2/fixpassword/fixpassword'
	export default {
		data() {
			return {
				multipleSelection1:[],
                mouseShow:false,
				sortShow:false,
				sysUserName: '',
				sysUserAvatar: '',
				message:[],
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		wacth:{	
	},
		methods: {	
			colseMouse(){
			
              this.mouseShow=false;
			},
			moveUP(){
    let query={};
        query.q = "MoveUp";
        query.para=JSON.stringify(["S", "1", null]);
        $.send('Query',query,this);
			},
			moveDown(){
    let query={};
        query.q = "MoveDown";
        query.para=JSON.stringify(["S", "1", null]);
        $.send('Query',query,this); 
			},
			newOne(){
               Bus.$emit('newone1',1);
			},
			rightmouse(data){//点击鼠标右键触发事件		
                 event.returnValue = false;
      	         this.mouseShow=true;
	        if((data.y+200)>window.innerHeight){
			     this.$refs.abc.style.top=(data.y-170)+'px';
			     this.$refs.abc.style.left=data.x+'px'; };
		     if((data.y+180) < window.innerHeight){
		          this.$refs.abc.style.top=data.y+'px';
		          this.$refs.abc.style.left=data.x+'px'; }
			},
			 paste(){
				 Bus.$emit('paste1',1);
			 },
				copy(){
                 Bus.$emit('copy1',1);
				},
			download(){
				Bus.$emit('doload',1);	
			},
				refre(){
 $.send('List',{Folder:this.$store.state.login.path},this);
  },	
      List_cb(state,commit,data){
             this.message=data.Items;	
			 Bus.$emit('refreLeft',data.Items);	
      },
			loginmenu(n){
		 	this.message=n;	
			 Bus.$emit('refreLeft',n);	
			},
			onSubmit(){
				console.log('submit!');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/');
				}).catch(() => {
				});
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
		},
		components: {
            'menut': menu_top,
			'menut1': menu_top1,
			'mentm': main_menu,
			'mentm1': main_menu1,
			'menub': menu_button,
			'leftm': left_menu,
			'na': nav,
			'na1': nav1,
			'myfavorite':favorite,
			'share': share,
			'userm': user_manage,
			'rprogress': right_progress,
			'fixpass': fixpassword,
			'concern': concern,
			// 'group': group,
}
	}
</script>
<style scoped lang="scss">
.container{
	    background: #FFFFFF;
	    top: 0px;
		bottom: 0px;
		height: 100%;
		width: 100%;
}
.container1{
	    background: #FFFFFF;
		
	  	height: 100%;
		width: 100%;
}

		.buttonGroup{
		 
		  background: #FFFFFF;
		}
	.backOrahead{
		width: 100%;
	}
	.backOrahead1{
		width: 100%;
		padding: 10px;
	}
	.nav{
	
	width: 100%;
	}
.main{
	        background: #FFFFFF;
	        border-top: 2px solid #97CBFF; 
			height: 100%;
			bottom: 0px;
			width: 100%;
			overflow: hidden;
}

	.leftTree { 
		     	height: 400px;
				overflow-y: scroll;
				overflow-x: scroll;
			}
			.content-container {
				height: 400px;
				top: 0px;
				bottom: 0px;
				overflow-y: scroll;
			}
			

	/*.container {
		background: #FFFFFF;
		position: absolute;
		top: 0px;
		bottom: 0px;
		height: 100%;
		width: 100%;
		.header {
			height: 11%;
			background: #FFFFFF;
			color: #c0ccda;
			.userinfo {
				text-align: right;
				padding-right: 35px;
			}	
			.logo {
				font-size: 22px;
			}
		}
		.buttonGroup{
		  height:11%;
		  background: #FFFFFF;
		}
	.backOrahead{
		height: 4%;
		background: #FFFFFF;
	}
		.main {
			border-top: 2px solid #97CBFF; 
			background: #ffffff;
			position: absolute;
			top: 300px;
			bottom: 0px;
			width: 100%;
			overflow: hidden;
			.leftTree {
				position: absolute;
				left:0px;
				top: 0px;
				bottom: 0px;
				overflow-y: scroll;
				overflow-x: scroll;
				float:left;
			}
			.content-container {
				background: #f1f2f7;
				position: absolute;
				width: 59%;
				right: 20%;
				top: 0px;
				bottom: 0px;
				overflow-y: scroll;
				padding:20px;
				.content-wrapper {
					background-color: #f1f2f7;
					box-sizing: border-box;
				}
			}
			.rightProgress{
				background: #f1f2f7;
				position: absolute;
				width: 20%;
				right: 0px;
				top: 0px;
				bottom: 0px;
				border-left: 1px solid #97CBFF;
			}
	
	}}*/
		/*.buttons{

    width: 100px;
    height: 30px;
    background: #f1f2f7;
}*/
	
</style>