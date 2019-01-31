import { Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {

    $(document).ready(() => {
      var isOpen = 0;
      //全局变量，判断是否已经打开弹出框
      center($(".box"));
      function center(obj) {
        //obj这个参数是弹出框的整个对象
        var screenWidth = $(window).width(), screenHeigth = $(window).height();
        //获取屏幕宽高
        var scollTop = $(document).scrollTop();
        //当前窗口距离页面顶部的距离
        var objLeft = (screenWidth - obj.width()) / 2;
        ///弹出框距离左侧距离
        var objTop = (screenHeigth - obj.height()) / 2 + scollTop;
        ///弹出框距离顶部的距离
        obj.css({
          left: objLeft + "px",
          top: objTop + "px",
        });
        obj.fadeIn(500);
        //弹出框淡入
        isOpen = 1;
        //弹出框打开后这个变量置1 说明弹出框是打开装填
        //当窗口大小发生改变时
        $(window).resize(function () {
          //只有isOpen状态下才执行
          if (isOpen == 1) {
            //重新获取数据
            screenWidth = $(window).width();
            screenHeigth = $(window).height();
            var scollTop = $(document).scrollTop();
            objLeft = (screenWidth - obj.width()) / 2;
            var objTop = (screenHeigth - obj.height()) / 2 + scollTop;
            obj.css({
              left: objLeft + "px",
              top: objTop + "px",
              font: objLeft/2 + "px"
            });
            obj.fadeIn(500);
          }
        });
        //当滚动条发生改变的时候
        $(window).scroll(function () {
          if (isOpen == 1) {
            //重新获取数据
            screenWidth = $(window).width();
            screenHeigth = $(window).height();
            var scollTop = $(document).scrollTop();
            objLeft = (screenWidth - obj.width()) / 2;
            var objTop = (screenHeigth - obj.height()) / 2 + scollTop;
            obj.css({
              left: objLeft + "px",
              top: objTop + "px",
              font: objLeft/2 + "px"
            });
            obj.fadeIn(500);
          }
        });
      }

    });
  }

}
