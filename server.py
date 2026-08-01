import json
import os
import socket
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/ip"):
            ip = self.get_local_ip()
            body = json.dumps({"ip": ip}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        super().do_GET()

    def get_local_ip(self):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
                sock.connect(("8.8.8.8", 80))
                return sock.getsockname()[0]
        except Exception:
            return "127.0.0.1"

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    os.chdir(os.path.dirname(__file__))
    server = ThreadingHTTPServer(("0.0.0.0", 8000), Handler)
    print("Serving at http://0.0.0.0:8000")
    server.serve_forever()
