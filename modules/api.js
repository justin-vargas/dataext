const https = require("https");
// Makes a HTTP(s) request and returns the result


exports.get = async function (url, hdrs) {
    host = url.replace("https://", '').split("/")[0];
    pth = url.replace(`https://${host}`, '')
    return new Promise((resolve, rej) => {
        let options = {
            hostname: host,
            port: 443,
            path: pth,
            method: 'GET',
            headers: hdrs

        };
        //console.log(JSON.stringify(options))
        let data = '';
        var req = https.request(options, (res) => {
            //console.log('statusCode:', res.statusCode);
            // console.log('headers:', res.headers);
            res.on('data', (d) => {
                // console.log('dat')
                data += d;
                //resolve(JSON.parse(d));
            });
            req.on('error', function (e) {
                console.error(e);
            });
            res.on('close', (c) => {
                let result_dat;
                try {
                    result_dat = JSON.parse(data);
                }
                catch (ex) {
                    //console.log(`Potential Error message: ${data}`)
                    result_dat=data;
                }
                resolve(result_dat);
            })
        });

        req.on('error', function (e) {
            console.error(e);
        });
        req.end();
    });
}


exports.post = async function (url, hdrs, post_data) {
    host = url.replace("https://", '').split("/")[0];
    pth = url.replace(`https://${host}`, '')
    let header = hdrs || {}
    header["Content-Type"] = "application/json"
    let poststr = JSON.stringify(post_data);
    header["Content-Length"] = poststr.length
    return new Promise(async (resolve, rej) => {
        let options = {
            hostname: host,
            port: 443,
            path: pth,
            method: 'POST',
            headers: hdrs
        };
        //  console.log(JSON.stringify(options))
        var resdata = '';
        var req = https.request(options, (res) => {
            // console.log('statusCode:', res.statusCode);
            // console.log('headers:', res.headers);
            res.on('data', (d) => {
                //console.log('dat')
                resdata += d;
            });
            res.on('error', (d) => {
                console.log(`ERROR: ${d}`);
            })
            res.on('close', (c) => {
                try {
                    let result = JSON.parse(resdata);
                    resolve(result);
                }
                catch (ex) {
                    console.log(`ERROR: ${resdata}`);
                    resolve(resdata);
                }
            })
        });

        req.on('error', (e) => {
            console.log(`ERROR ${resdata}`);
            rej(e);
        });
        //   console.log(`POST DATA: ${poststr}}`)
        req.write(poststr);
        req.end();
    });
}


exports.put = function (url, data, file_type, metadata={}) {
    //console.log(data);
    return new Promise((resolve, reject) => {
        const hostname = url.replace("https://", "").split(`/`)[0]
        const path = url.replace(`https://${hostname}`, "")
        /* console.log(`HOSTNAME: ${hostname}`)
         console.log(`PATH: ${path}`)
         console.log(`TYPE: ${file_type}`)*/
        let hdrs={ "x-ms-blob-type": "BlockBlob", 'x-ms-blob-content-type': file_type, 'Content-Length': data.length }
        if (Object.keys(metadata).length>0) {
            //encodes metadata values the way blob storage expects to see them
            Object.keys(metadata).forEach((key)=> {
                hdrs[`x-ms-meta-${key}`]=metadata[key]
            })
        }
        options = {
            hostname: hostname,
            port: 443,
            path: path,
            method: 'PUT',
            headers: hdrs
        }
        let resdata = '';
        const req = https.request(options, res => {
            //console.log('PUT statusCode:', res.statusCode);
            //console.log('headers:', res.headers);
            res.on('data', (d) => {
                //console.log('dat')
                resdata += d;
            });
            res.on('error', (d) => {
                console.log(`ERROR: ${d}`);
            })
            res.on('close', (c) => {
                resolve('done');
            })
            //  console.log(`PUT STATUS ${res.statusCode}`);
        })
        req.write(data);
        req.end();
    });

}