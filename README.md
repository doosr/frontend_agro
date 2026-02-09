# 🌱 SmartPlant IA - Frontend

Interface web React pour le système SmartPlant IA.
![Capture d’écran](Capture%20d’écran%20(89).png)

## 🚀 Technologies

- **React 18** - Framework UI
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - API calls
- **Socket.io Client** - Temps réel
- **Recharts** - Graphiques
- **React Toastify** - Notifications
- **Lucide React** - Icônes
- **Date-fns** - Manipulation des dates

## 📦 Installation
```bash
# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Éditer .env avec vos configurations
nano .env
```

## 🔧 Configuration

Modifiez le fichier `.env` :
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## 🏃 Démarrage

### Mode Développement
```bash
npm start
```
Ouvre [http://localhost:3000](http://localhost:3000)

### Build Production
```bash
npm run build
```
Génère le dossier `build/` optimisé

### Tests
```bash
npm test
```

## 📁 Structure
```
src/
├── components/       # Composants réutilisables
│   ├── common/      # Composants UI de base
│   ├── layout/      # Layout et navigation
│   ├── dashboard/   # Composants dashboard
│   ├── sensors/     # Composants capteurs
│   ├── irrigation/  # Composants irrigation
│   ├── analysis/    # Composants analyse IA
│   └── admin/       # Composants admin
├── pages/           # Pages de l'application
├── services/        # Services API
├── context/         # Context React
├── hooks/           # Custom hooks
├── utils/           # Utilitaires
└── config/          # Configuration
```

## 🎨 Composants Principaux

### Layout
- `Layout` - Structure principale
- `Navbar` - Barre de navigation
- `Sidebar` - Menu latéral

### Common
- `Button` - Bouton personnalisé
- `Card` - Carte de contenu
- `Input` - Champ de saisie
- `Modal` - Fenêtre modale
- `Loader` - Indicateur de chargement

### Dashboard
- `SensorCard` - Carte de capteur
- `ChartWidget` - Graphique
- `AlertPanel` - Panneau d'alertes

## 🔐 Authentification

Le système utilise JWT pour l'authentification :
```javascript
import { useAuth } from './context/AuthContext';

const { user, login, logout } = useAuth();
```

## 🔌 API & WebSocket

### API REST
```javascript
import api from './config/api';

const data = await api.get('/endpoint');
```

### Socket.io
```javascript
import socketService from './services/socketService';

socketService.connect(userId);
socketService.on('event', callback);
```

## 🎨 Styling avec Tailwind

Utilisation des classes utilitaires :
```jsx
<div className="bg-white rounded-xl shadow-md p-6">
  <h1 className="text-2xl font-bold text-gray-900">Titre</h1>
</div>
```

## 📊 Graphiques

Utilisation de Recharts :
```jsx
import { LineChart, Line, XAxis, YAxis } from 'recharts';

<LineChart data={data}>
  <Line dataKey="value" stroke="#22c55e" />
</LineChart>
```

## 🔔 Notifications
```javascript
import { toast } from 'react-toastify';

toast.success('Action réussie');
toast.error('Une erreur est survenue');
toast.warning('Attention');
toast.info('Information');
```

## 📱 Responsive Design

L'interface est entièrement responsive :

- Mobile : < 640px
- Tablet : 640px - 1024px
- Desktop : > 1024px

## 🚀 Déploiement

### Netlify
```bash
npm run build
# Déployez le dossier build/
```

### Vercel
```bash
vercel --prod
```

### Serveur Apache/Nginx
```bash
npm run build
# Copiez build/ vers votre serveur
```

## 🔧 Variables d'Environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| REACT_APP_API_URL | URL de l'API | http://localhost:5000/api |
| REACT_APP_SOCKET_URL | URL WebSocket | http://localhost:5000 |
| REACT_APP_ENV | Environnement | development |

## 🐛 Débogage

### Mode Debug
Activez dans `.env` :
```env
REACT_APP_DEBUG=true
```

### React DevTools
Installez l'extension Chrome/Firefox React Developer Tools

## 📝 Scripts NPM

| Script | Description |
|--------|-------------|
| `npm start` | Démarre en mode dev |
| `npm run build` | Build de production |
| `npm test` | Lance les tests |
| `npm run eject` | Éjecte la config |

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

MIT License - voir le fichier LICENSE

## 👥 Support

Pour toute question ou problème :
- 📧 Email : dawserbelgacem122@gmail.com
- 📱 Téléphone : +216 28378124
