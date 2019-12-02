// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/wangwang.css'
import './rem'
// 引入公共样式
 import '@/assets/css/common.less'
 import { httpGet,httpImgUpoad,httpPost,httpPost1} from './service'
 import VConsole from 'vconsole'
 const  vConsole = new VConsole();
import { Button,Toast ,Image,ActionSheet,Grid, GridItem  ,NoticeBar , Field,Swipe, SwipeItem , Tabbar,Search, List,PullRefresh ,Card,TabbarItem,Cell, CellGroup ,Divider,Row, Col,NavBar,Dialog ,Icon ,DropdownMenu, DropdownItem,DatetimePicker,Picker,Uploader,Popup,RadioGroup,Radio} from 'vant'

Vue.prototype.$get = httpGet;
Vue.prototype.$post = httpPost;
Vue.prototype.$post1 = httpPost1;
Vue.prototype.$ImgUpoad = httpImgUpoad;


Vue.use(Button)
.use(List).use(Card).use(PullRefresh)
.use(DatetimePicker)
.use(Toast)
.use(Picker)
.use(Uploader)
.use(Popup)
.use(DropdownMenu)
.use(DropdownItem)
.use(RadioGroup)
.use(Radio)
.use(Search)
.use(Image)
.use(NoticeBar)
.use(Cell)
.use(Field)
.use(Swipe)
.use(SwipeItem)
.use(CellGroup)
.use(ActionSheet)
.use(Grid)
.use(GridItem)
.use(Divider)
.use(Row)
.use(Col)
.use(NavBar)
.use(Dialog)
.use(Icon)
.use(DropdownMenu)
.use(DropdownItem)
.use(Tabbar).use(TabbarItem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
