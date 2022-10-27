import moment from "moment/moment";

export default function ({app}, inject) {

    inject('fromUnixTimestamp', (timestamp) => {
        return moment.unix(timestamp).format('YYYY-MM-DD HH:mm')
    })
}
