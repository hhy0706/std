"scripts": {
"ssh:dev": "./shell/linux/ssh-dev.sh $1",
},


ssh-dev.sh文件
——————————————————
#!/bin/bash

# 定义打包的项目
project=$1 # 接受项目名称参数
if [ ! $project ]; then
echo "请输入部署的项目"
exit
fi

# 全局参数
homeDir=/usr/local/nginx/html
host=xxxx
port=xxxx
user=xxxx
password=xxxx

# 打包项目
echo "开始打包项目"
cd out
tar -zcvf $project.tar.gz $project/

# 上传代码并进入服务器中
sshpass -p $password scp -P $port $project.tar.gz $user@$host:$homeDir
sshpass -p $password ssh -p $port $user@$host "cd $homeDir && tar -zxvf $project.tar.gz && chown -R root:root $project && chmod -R 755 $project && rm -f $project.tar.gz"

echo "部署完成";
