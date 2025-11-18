import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    // Socket singleton
    if (!SocketService.instance) {
      this.socket = io(SOCKET_URL, {
        autoConnect: false, // ne pas se connecter immédiatement
        transports: ['websocket'],
        auth: {
          token: localStorage.getItem('token')
        }
      });

      this.socket.on('connect', () => console.log('✅ Socket connecté:', this.socket.id));
      this.socket.on('disconnect', (reason) => console.log('❌ Socket déconnecté:', reason));

      SocketService.instance = this;
    }

    return SocketService.instance;
  }

  connect(userId) {
    if (!this.socket.connected) {
      this.socket.connect();
    }
    if (userId) {
      this.socket.emit('join', userId);
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

const instance = new SocketService();
export default instance;
