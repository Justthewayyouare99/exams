﻿

静态服务器：(在cs6里面进行安装部署)
1.解压即安装：
	解压到当前文件夹
2.复制文件路径，到解压的文件夹一级即可
	E:\2016_Lesson\2016年工作课程备课\静态服务器文件\Apache24
3.找到Apache24\conf文件夹，更改配置
	打开里面的httpd.conf文件(css编写所以是conf文件，相当于tomcat练得server.xml)
4.文件38行的默认路径需要更改为解压的路径(斜杠一定要改为与之前方向一致的)
	将前面复制的路径进行粘贴，将反斜杠改为正斜杠
	E:/2016_Lesson/2016年工作课程备课/静态服务器文件/Apache24

	60行表示当前服务器默认端口为80，如果有冲突可以改为81
5.htdocs文件夹相当于tomcat里面的workspace，用来存放项目，将站点位置定义在该文件夹下
6.打开bin文件夹，找到启动图标：httpd.exe   双击即可
7.
打开cs6，新建站点，站点位置定位在htdocs文件夹下面。
8.点击站点按钮下方的服务器按钮，新增一个服务器。
	连接方法选择  本地/网络，
	服务器文件夹定位在解压的文件夹即可
	E:\2016_Lesson\2016年工作课程备课\静态服务器文件\Apache24
9.Web  url：表示访问的路径，写上后即可不用每次打开网页都输入网址
	http://localhost:80
	http://localhost
点击保存之后-->点击勾选测试(之后每次测试网页都可以使用网络地址，而不是file地址)

