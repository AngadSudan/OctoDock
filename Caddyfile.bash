ai.angadsudan.me {
    reverse_proxy 127.0.0.1:11434 {
        header_up Host 127.0.0.1
        flush_interval -1
        transport http {
            dial_timeout 0
            response_header_timeout 0
            read_timeout 0
            write_timeout 0
        }
    }
}
