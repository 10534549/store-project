export default function({ redirect }) {
    if (process.server) {
        console.log('IN', global.getUserDetail)
        if (global.getUserDetail === undefined) {
            return redirect('/')
        }
    }
}
// export default function ({ redirect}) {
//   if (localStorage.accessToken === undefined) {
//     return redirect('/')
//   }
// }
