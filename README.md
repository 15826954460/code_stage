# code_stage

## Project setup
```
npm install
npm run serve
npm run build
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 测试账号
admin 超管  admin2 管理员  admin3 审核员 admin4 信息录入员  密码  1q2w3e


adminType   1: 超级管理员 2: 管理员
userType:   1: 管理员 2: 普通用户
status(用户状态):     1：启用  2：禁用

创建用户规则
bys_001 / Bys_2021_001
bys_002 / Bys_2021_002

#### 用户权限相关
[x] 甲方权限管理
[x] 乙方权限管理(非代理：只允许添加五个普通用户; )
[ ] 用户分布以及用户增长饼图
[ ] 鼠标放在地图上的点，显示单位详情
[ ] 地图搜索定位
[ ] 建筑、单位搜索
[x] 建筑、单位分页
[x] 乙方代理、管理员 创建管理员超过5个要做限制
[x] 获取所有单位、过滤掉非一级单位
[x] 创建公司权限调整
[x] 有待沟通，单位下需要建筑id,建筑可以关联设备
[x] 用户筛选条件
[x] 每家单位只允许创建一个管理员账号限制
[ ] 创建用户的时候，手机号相同没有做限制
[ ] 甲方删除建筑、单位相关验证
[ ] 乙方权限控制

##### 权限说明
甲方：
  超管：所有权限、部门跨及创建账号、只能创建管理员账号
  普管：没有删除权限、其它同超管

乙方：
  超管：最多创建五个普管账号, 针对当前单位内的设备和用户用所所有权限
  普管：只能管理设备、而且没有删除权限

#### 清屏账号
https://www.qingpingiot.com/devices
账号:ling.shi@sgcchina.com
密码:sgjc1010