
//创建连接对象
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql2')

//连接数据库
let db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'mkbk'

})
let data = []


//配置解析post请求
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//添加信息
app.post('/', (req, res) => {
    console.log(req.body);
    let sql = 'insert into message set userId=?,content=?,createTime=?'
    db.query(sql, [req.body.userId, req.body.content, req.body.createTime], (err, result) => {
        if (err) {
            console.error(err); // 打印错误信息以进行调试
            res.status(500).send({
                message: '数据插入失败',
                code: 500,
            });
        } else {
                res.send({
                    message: '数据插入成功',
                    code: 200,
                });
            }
            
        
    });
})
//获取聊天记录
app.get('/',(req,res)=>
db.query('select*form message',(err,result)=>{
    console.log(result);
    res.send({
        message:'获取成功',
        code:200,
        data:result
    })
})
)

app.listen(8080, () => {
    console.log('服务器启动成功')
})