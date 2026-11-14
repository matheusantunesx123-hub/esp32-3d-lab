// ESP32 & Módulos 3D Lab - Application Logic

// --- Microcontroller Definitions & Pinouts ---
const MCUS = {
  esp32_wroom_30: {
    id: 'esp32_wroom_30',
    name: 'ESP32 DevKit V1 (30 Pinos)',
    pinsCount: 30,
    logicVoltage: '3.3V',
    powerPins: ['VIN (5V)', '3V3', 'GND', 'GND'],
    i2c: { sda: 'GPIO 21', scl: 'GPIO 22' },
    spi: { mosi: 'GPIO 23', miso: 'GPIO 19', sck: 'GPIO 18', cs: 'GPIO 5' },
    uart: { tx: 'GPIO 1 (TX0)', rx: 'GPIO 3 (RX0)' },
    adc1: ['GPIO 36 (VP)', 'GPIO 39 (VN)', 'GPIO 34', 'GPIO 35', 'GPIO 32', 'GPIO 33'],
    dac: ['GPIO 25 (DAC1)', 'GPIO 26 (DAC2)'],
    onboardLed: 'GPIO 2',
    leftPins: ['EN', 'VP (36)', 'VN (39)', 'D34', 'D35', 'D32', 'D33', 'D25', 'D26', 'D27', 'D14', 'D12', 'D13', 'GND', 'VIN'],
    rightPins: ['D23', 'D22', 'TX0 (1)', 'RX0 (3)', 'D21', 'D19', 'D18', 'D5', 'TX2 (17)', 'RX2 (16)', 'D4', 'D2', 'D15', 'GND', '3V3']
  },
  esp32_wroom_38: {
    id: 'esp32_wroom_38',
    name: 'ESP32 DevKit V1 (38 Pinos)',
    pinsCount: 38,
    logicVoltage: '3.3V',
    powerPins: ['VIN (5V)', '3V3', 'GND'],
    i2c: { sda: 'GPIO 21', scl: 'GPIO 22' },
    spi: { mosi: 'GPIO 23', miso: 'GPIO 19', sck: 'GPIO 18', cs: 'GPIO 5' },
    onboardLed: 'GPIO 2',
    leftPins: ['3V3', 'EN', 'VP (36)', 'VN (39)', 'D34', 'D35', 'D32', 'D33', 'D25', 'D26', 'D27', 'D14', 'D12', 'GND', 'D13', 'D9', 'D10', 'D11', 'VIN'],
    rightPins: ['GND', 'D23', 'D22', 'TX0 (1)', 'RX0 (3)', 'D21', 'D19', 'D18', 'D5', 'TX2 (17)', 'RX2 (16)', 'D4', 'D2', 'D15', 'D8', 'D7', 'D6', 'CLK', 'CMD']
  },
  esp8266_nodemcu: {
    id: 'esp8266_nodemcu',
    name: 'ESP8266 NodeMCU V3 (ESP-12E)',
    pinsCount: 30,
    logicVoltage: '3.3V',
    powerPins: ['VIN (5V)', '3V3', 'GND'],
    i2c: { sda: 'D2 (GPIO 4)', scl: 'D1 (GPIO 5)' },
    spi: { mosi: 'D7 (GPIO 13)', miso: 'D6 (GPIO 12)', sck: 'D5 (GPIO 14)', cs: 'D8 (GPIO 15)' },
    onboardLed: 'D4 (GPIO 2)',
    leftPins: ['A0 (ADC0)', 'RSV', 'RSV', 'SD3', 'SD2', 'SD1', 'CMD', 'SD0', 'CLK', 'GND', '3V3', 'EN', 'RST', 'GND', 'VIN'],
    rightPins: ['D0 (GPIO 16)', 'D1 (GPIO 5)', 'D2 (GPIO 4)', 'D3 (GPIO 0)', 'D4 (GPIO 2)', '3V3', 'GND', 'D5 (GPIO 14)', 'D6 (GPIO 12)', 'D7 (GPIO 13)', 'D8 (GPIO 15)', 'RX', 'TX', 'GND', '3V3']
  },
  esp8266_d1mini: {
    id: 'esp8266_d1mini',
    name: 'ESP8266 D1 Mini',
    pinsCount: 16,
    logicVoltage: '3.3V',
    powerPins: ['5V', '3V3', 'GND'],
    i2c: { sda: 'D2 (GPIO 4)', scl: 'D1 (GPIO 5)' },
    onboardLed: 'D4 (GPIO 2)',
    leftPins: ['RST', 'A0', 'D0', 'D5', 'D6', 'D7', 'D8', '3V3'],
    rightPins: ['TX', 'RX', 'D1', 'D2', 'D3', 'D4', 'GND', '5V']
  }
};

// --- Default Database of Sensors & Modules ---
const DEFAULT_MODULE_DATABASE = [
  {
    id: 'rele_1ch',
    name: 'Módulo Relé (1 Canal)',
    category: 'atuador',
    voltage: '5V / 3.3V',
    color: '#3b82f6',
    icon: 'fa-toggle-on',
    pins: ['VCC', 'GND', 'IN'],
    defaultEspPins: { 'VCC': 'VIN (5V)', 'GND': 'GND', 'IN': 'GPIO 23' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'IN': '#eab308' },
    desc: 'Permite acionar cargas de alta tensão (lâmpadas, motores, fechaduras) via sinal digital.'
  },
  {
    id: 'dht22',
    name: 'Sensor DHT22 (Temp & Umidade)',
    category: 'sensor',
    voltage: '3.3V',
    color: '#10b981',
    icon: 'fa-temperature-half',
    pins: ['VCC', 'DATA', 'GND'],
    defaultEspPins: { 'VCC': '3V3', 'GND': 'GND', 'DATA': 'GPIO 4' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'DATA': '#06b6d4' },
    desc: 'Mede temperatura (-40 a 80°C) e umidade com alta precisão.'
  },
  {
    id: 'oled_i2c',
    name: 'Display OLED 0.96" I2C (SSD1306)',
    category: 'display',
    voltage: '3.3V',
    color: '#06b6d4',
    icon: 'fa-tv',
    pins: ['VCC', 'GND', 'SCL', 'SDA'],
    defaultEspPins: { 'VCC': '3V3', 'GND': 'GND', 'SCL': 'GPIO 22', 'SDA': 'GPIO 21' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'SCL': '#a855f7', 'SDA': '#3b82f6' },
    desc: 'Tela gráfica monocromática 128x64 pixels comunicando via barramento I2C.'
  },
  {
    id: 'hc_sr04',
    name: 'Sensor Ultrassônico (HC-SR04)',
    category: 'sensor',
    voltage: '5V',
    color: '#8b5cf6',
    icon: 'fa-arrows-left-right-to-line',
    pins: ['VCC', 'TRIG', 'ECHO', 'GND'],
    defaultEspPins: { 'VCC': 'VIN (5V)', 'GND': 'GND', 'TRIG': 'GPIO 5', 'ECHO': 'GPIO 18' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'TRIG': '#10b981', 'ECHO': '#f59e0b' },
    desc: 'Mede distância de 2cm a 400cm via ondas ultrassônicas.'
  },
  {
    id: 'pir_motion',
    name: 'Sensor de Presença PIR (HC-SR501)',
    category: 'sensor',
    voltage: '5V',
    color: '#f97316',
    icon: 'fa-person-walking',
    pins: ['VCC', 'OUT', 'GND'],
    defaultEspPins: { 'VCC': 'VIN (5V)', 'GND': 'GND', 'OUT': 'GPIO 19' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'OUT': '#ec4899' },
    desc: 'Detecta movimento e presença humana através da variação de radiação infravermelha.'
  },
  {
    id: 'sg90_servo',
    name: 'Micro Servo Motor (SG90 9g)',
    category: 'atuador',
    voltage: '5V',
    color: '#eab308',
    icon: 'fa-gear',
    pins: ['VCC (Vermelho)', 'GND (Marrom)', 'PWM (Laranja)'],
    defaultEspPins: { 'VCC (Vermelho)': 'VIN (5V)', 'GND (Marrom)': 'GND', 'PWM (Laranja)': 'GPIO 13' },
    wireColors: { 'VCC (Vermelho)': '#ef4444', 'GND (Marrom)': '#451a03', 'PWM (Laranja)': '#f97316' },
    desc: 'Motor com rotação de 0° a 180° com controle por pulsos PWM.'
  },
  {
    id: 'ldr_light',
    name: 'Sensor de Luz LDR com Comparador',
    category: 'sensor',
    voltage: '3.3V',
    color: '#84cc16',
    icon: 'fa-sun',
    pins: ['VCC', 'GND', 'DO (Digital)', 'AO (Analógico)'],
    defaultEspPins: { 'VCC': '3V3', 'GND': 'GND', 'DO (Digital)': 'GPIO 15', 'AO (Analógico)': 'GPIO 34' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'DO (Digital)': '#14b8a6', 'AO (Analógico)': '#eab308' },
    desc: 'Detecta luminosidade ambiente com saída digital ajustável por trimpot e analógica.'
  },
  {
    id: 'buzzer_active',
    name: 'Buzzer Sonoro Ativo',
    category: 'atuador',
    voltage: '3.3V / 5V',
    color: '#ec4899',
    icon: 'fa-bullhorn',
    pins: ['VCC (+)', 'GND (-)'],
    defaultEspPins: { 'VCC (+)': 'GPIO 25', 'GND (-)': 'GND' },
    wireColors: { 'VCC (+)': '#ef4444', 'GND (-)': '#0f172a' },
    desc: 'Emite avisos sonoros e bips contínuos com sinal digital HIGH.'
  }
];

// --- App State ---
let currentMcuId = 'esp32_wroom_30';
let moduleDatabase = [];
let attachedModules = []; // IDs of modules attached to the current build
let currentView = '3d';
let showBreadboard = true;
let showWires = true;
let isAutoRotating = false;

// Virtual simulation states
let virtualPower = false;
let virtualLedState = false;
let virtualRelayState = false;
let virtualDhtTemp = 24.5;
let virtualDhtHum = 58;

// --- Three.js Globals ---
let scene, camera, renderer, controls;
let mcuMeshGroup, breadboardMeshGroup, modulesMeshGroup, wiresMeshGroup;
let raycaster, mouse;
let interactivePins = [];
let oledCanvas, oledTexture;

// --- Initialization ---
window.addEventListener('DOMContentLoaded', () => {
  loadDatabase();
  initThreeJs();
  renderCatalog();
  renderAttachedModules();
  updatePhysicalWiringGuide();
  generateFirmwareCode();
  renderDatabaseExplorer();
  updateVirtualControls();
  window.addEventListener('resize', onWindowResize);
});

// Load database from localStorage or defaults
function loadDatabase() {
  const saved = localStorage.getItem('esp32_lab_custom_db');
  if (saved) {
    try {
      moduleDatabase = JSON.parse(saved);
    } catch (e) {
      moduleDatabase = [...DEFAULT_MODULE_DATABASE];
    }
  } else {
    moduleDatabase = [...DEFAULT_MODULE_DATABASE];
  }

  // Auto attach first module (Relay) for instant visual satisfaction
  attachedModules = ['rele_1ch'];
}

function saveDatabase() {
  localStorage.setItem('esp32_lab_custom_db', JSON.stringify(moduleDatabase));
}

// --- Navigation / View Switching ---
function switchView(viewName) {
  currentView = viewName;
  const views = ['3d', 'wiring', 'test', 'db'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    const btn = document.getElementById(`tab-btn-${v}`);
    if (el) {
      if (v === viewName) {
        el.classList.remove('hidden');
        if (btn) {
          btn.className = "px-4 py-1.5 rounded-lg font-medium transition-all duration-200 bg-cyan-500 text-white shadow";
        }
      } else {
        el.classList.add('hidden');
        if (btn) {
          btn.className = "px-4 py-1.5 rounded-lg font-medium text-slate-400 hover:text-white transition-all duration-200";
        }
      }
    }
  });

  if (viewName === '3d') {
    onWindowResize();
  } else if (viewName === 'wiring') {
    updatePhysicalWiringGuide();
  } else if (viewName === 'test') {
    generateFirmwareCode();
    updateVirtualControls();
  } else if (viewName === 'db') {
    renderDatabaseExplorer();
  }
}

// --- MCU Selection ---
function onMcuChange(mcuId) {
  currentMcuId = mcuId;
  const mcu = MCUS[mcuId];
  document.getElementById('hud-mcu-name').textContent = mcu.name;
  document.getElementById('inspector-mcu-badge').textContent = `${mcu.pinsCount} Pinos`;
  rebuild3dScene();
  updatePhysicalWiringGuide();
  generateFirmwareCode();
  showToast(`Microcontrolador alterado para ${mcu.name}`);
}

// --- Module Management ---
function attachModule(moduleId) {
  if (attachedModules.includes(moduleId)) {
    showToast('Este módulo já está conectado na placa!');
    return;
  }
  attachedModules.push(moduleId);
  renderAttachedModules();
  rebuild3dScene();
  updatePhysicalWiringGuide();
  generateFirmwareCode();
  updateVirtualControls();
  showToast('Módulo adicionado à montagem!');
}

function detachModule(moduleId) {
  attachedModules = attachedModules.filter(id => id !== moduleId);
  renderAttachedModules();
  rebuild3dScene();
  updatePhysicalWiringGuide();
  generateFirmwareCode();
  updateVirtualControls();
  showToast('Módulo desconectado.');
}

function clearAttachedModules() {
  attachedModules = [];
  renderAttachedModules();
  rebuild3dScene();
  updatePhysicalWiringGuide();
  generateFirmwareCode();
  updateVirtualControls();
  showToast('Todos os módulos foram removidos.');
}

function renderAttachedModules() {
  const container = document.getElementById('attached-modules-list');
  const countEl = document.getElementById('attached-count');
  countEl.textContent = attachedModules.length;

  if (attachedModules.length === 0) {
    container.innerHTML = `
      <div class="text-[11px] text-slate-500 text-center py-3 border border-dashed border-slate-800 rounded-lg">
        Nenhum módulo conectado.<br>Selecione no catálogo abaixo.
      </div>
    `;
    return;
  }

  container.innerHTML = attachedModules.map(modId => {
    const mod = moduleDatabase.find(m => m.id === modId);
    if (!mod) return '';
    return `
      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded flex items-center justify-center text-xs text-white" style="background-color: ${mod.color}">
            <i class="fa-solid ${mod.icon}"></i>
          </div>
          <div>
            <div class="text-xs font-semibold text-slate-200">${mod.name}</div>
            <div class="text-[10px] text-cyan-400 font-mono">${mod.voltage} • ${mod.pins.length} pinos</div>
          </div>
        </div>
        <button onclick="detachModule('${mod.id}')" class="text-slate-500 hover:text-rose-400 p-1 text-xs transition" title="Remover">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;
  }).join('');
}

function renderCatalog(filterText = '') {
  const container = document.getElementById('catalog-list');
  const filtered = moduleDatabase.filter(m => 
    m.name.toLowerCase().includes(filterText.toLowerCase()) || 
    m.category.toLowerCase().includes(filterText.toLowerCase()) ||
    m.desc.toLowerCase().includes(filterText.toLowerCase())
  );

  container.innerHTML = filtered.map(mod => {
    const isAttached = attachedModules.includes(mod.id);
    return `
      <div onclick="${isAttached ? `detachModule('${mod.id}')` : `attachModule('${mod.id}')`}" 
           class="p-2.5 rounded-xl border ${isAttached ? 'border-cyan-500/60 bg-cyan-950/20' : 'border-slate-800 bg-slate-950 hover:border-slate-700'} cursor-pointer transition flex items-center justify-between group">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-white shadow" style="background-color: ${mod.color}">
            <i class="fa-solid ${mod.icon}"></i>
          </div>
          <div>
            <div class="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition">${mod.name}</div>
            <div class="text-[10px] text-slate-400 flex items-center gap-1.5">
              <span class="capitalize">${mod.category}</span>
              <span>•</span>
              <span class="text-amber-400">${mod.voltage}</span>
            </div>
          </div>
        </div>
        <div class="text-xs ${isAttached ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}">
          <i class="fa-solid ${isAttached ? 'fa-circle-check' : 'fa-plus'}"></i>
        </div>
      </div>
    `;
  }).join('');
}

function filterCatalog() {
  const query = document.getElementById('catalog-search').value;
  renderCatalog(query);
}

// --- THREE.JS 3D SCENE ENGINE ---
function initThreeJs() {
  const container = document.getElementById('canvas-container');
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030712); // Slate 950
  scene.fog = new THREE.FogExp2(0x030712, 0.025);

  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 16, 22);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2.05; // don't go below floor
  controls.minDistance = 5;
  controls.maxDistance = 50;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
  mainLight.position.set(10, 25, 15);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  // Cyan & Blue accent point lights for tech aesthetic
  const cyanGlow = new THREE.PointLight(0x06b6d4, 1.5, 30);
  cyanGlow.position.set(-10, 8, 5);
  scene.add(cyanGlow);

  const purpleGlow = new THREE.PointLight(0x8b5cf6, 1.2, 30);
  purpleGlow.position.set(10, 8, -5);
  scene.add(purpleGlow);

  // Grid & Floor
  const gridHelper = new THREE.GridHelper(50, 50, 0x0891b2, 0x1e293b);
  gridHelper.position.y = -0.01;
  scene.add(gridHelper);

  // Raycaster & Mouse
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('click', onMouseClick);

  // Setup Dynamic OLED Canvas Texture
  setupOledDynamicTexture();

  // Build Scene
  rebuild3dScene();

  // Animation Loop
  animate();
}

function setupOledDynamicTexture() {
  oledCanvas = document.createElement('canvas');
  oledCanvas.width = 256;
  oledCanvas.height = 128;
  const ctx = oledCanvas.getContext('2d');
  ctx.fillStyle = '#050b14';
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = '#06b6d4';
  ctx.font = 'bold 16px Courier New, monospace';
  ctx.fillText('ESP32 3D LAB', 15, 35);
  ctx.font = '12px Courier New, monospace';
  ctx.fillText('WiFi: Conectado', 15, 60);
  ctx.fillText('IP: 192.168.1.104', 15, 80);
  ctx.fillText('Status: ONLINE', 15, 105);

  oledTexture = new THREE.CanvasTexture(oledCanvas);
}

function updateOledTextureText(temp, hum) {
  if (!oledCanvas) return;
  const ctx = oledCanvas.getContext('2d');
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = '#06b6d4';
  ctx.font = 'bold 16px Courier New, monospace';
  ctx.fillText('ESP32 I2C MONITOR', 15, 30);
  ctx.fillStyle = '#38bdf8';
  ctx.font = '14px Courier New, monospace';
  ctx.fillText(`Temp: ${temp.toFixed(1)} °C`, 15, 60);
  ctx.fillText(`Umid: ${hum}%`, 15, 85);
  ctx.fillStyle = '#10b981';
  ctx.fillText(`Relé: ${virtualRelayState ? 'LIGADO' : 'DESLIGADO'}`, 15, 110);
  oledTexture.needsUpdate = true;
}

function rebuild3dScene() {
  // Clear previous groups
  if (mcuMeshGroup) scene.remove(mcuMeshGroup);
  if (breadboardMeshGroup) scene.remove(breadboardMeshGroup);
  if (modulesMeshGroup) scene.remove(modulesMeshGroup);
  if (wiresMeshGroup) scene.remove(wiresMeshGroup);

  interactivePins = [];

  mcuMeshGroup = new THREE.Group();
  breadboardMeshGroup = new THREE.Group();
  modulesMeshGroup = new THREE.Group();
  wiresMeshGroup = new THREE.Group();

  // 1. Build Breadboard
  if (showBreadboard) {
    createBreadboard3D(breadboardMeshGroup);
  }

  // 2. Build Selected MCU (ESP32 / ESP8266)
  createMcu3D(mcuMeshGroup, currentMcuId);

  // 3. Build Attached Modules
  createAttachedModules3D(modulesMeshGroup);

  // 4. Build 3D Wiring
  if (showWires) {
    createWires3D(wiresMeshGroup);
  }

  scene.add(breadboardMeshGroup);
  scene.add(mcuMeshGroup);
  scene.add(modulesMeshGroup);
  scene.add(wiresMeshGroup);
}

// Procedural Breadboard Model
function createBreadboard3D(group) {
  const bbWidth = 22;
  const bbHeight = 1.2;
  const bbDepth = 8;

  // Breadboard body
  const bodyGeo = new THREE.BoxGeometry(bbWidth, bbHeight, bbDepth);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.6,
    metalness: 0.05
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.position.set(0, bbHeight / 2, 0);
  bodyMesh.receiveShadow = true;
  bodyMesh.castShadow = true;
  group.add(bodyMesh);

  // Center trough (notch)
  const notchGeo = new THREE.BoxGeometry(bbWidth - 0.5, 0.4, 0.8);
  const notchMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
  const notchMesh = new THREE.Mesh(notchGeo, notchMat);
  notchMesh.position.set(0, bbHeight, 0);
  group.add(notchMesh);

  // Power rails (red & blue stripes)
  const lineGeo = new THREE.BoxGeometry(bbWidth - 1, 0.02, 0.15);
  const redMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const blueMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });

  // Top rails
  const topRed = new THREE.Mesh(lineGeo, redMat);
  topRed.position.set(0, bbHeight + 0.01, 3.5);
  group.add(topRed);
  const topBlue = new THREE.Mesh(lineGeo, blueMat);
  topBlue.position.set(0, bbHeight + 0.01, 3.1);
  group.add(topBlue);

  // Bottom rails
  const botBlue = new THREE.Mesh(lineGeo, blueMat);
  botBlue.position.set(0, bbHeight + 0.01, -3.1);
  group.add(botBlue);
  const botRed = new THREE.Mesh(lineGeo, redMat);
  botRed.position.set(0, bbHeight + 0.01, -3.5);
  group.add(botRed);
}

// Procedural ESP32 / ESP8266 3D Model
function createMcu3D(group, mcuId) {
  const mcu = MCUS[mcuId];
  const pcbLength = 7.5;
  const pcbWidth = 3.6;
  const pcbThickness = 0.22;

  // PCB Board (Dark blue / black)
  const pcbGeo = new THREE.BoxGeometry(pcbLength, pcbThickness, pcbWidth);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x091428,
    roughness: 0.4,
    metalness: 0.2
  });
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
  pcbMesh.position.set(-3.5, 1.8, 0);
  pcbMesh.castShadow = true;
  pcbMesh.receiveShadow = true;
  group.add(pcbMesh);

  // Metal Shield (ESP-WROOM-32 Can)
  const shieldGeo = new THREE.BoxGeometry(2.6, 0.4, 2.4);
  const shieldMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    metalness: 0.85,
    roughness: 0.2
  });
  const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
  shieldMesh.position.set(-2.8, 2.05, 0);
  shieldMesh.castShadow = true;
  group.add(shieldMesh);

  // Micro USB Port
  const usbGeo = new THREE.BoxGeometry(0.9, 0.4, 1.0);
  const usbMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.9, roughness: 0.1 });
  const usbMesh = new THREE.Mesh(usbGeo, usbMat);
  usbMesh.position.set(-6.8, 2.0, 0);
  group.add(usbMesh);

  // Push buttons (EN and BOOT)
  const btnMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3 });
  const btn1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.4), btnMat);
  btn1.position.set(-6.0, 2.0, -1.2);
  group.add(btn1);
  const btn2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.4), btnMat);
  btn2.position.set(-6.0, 2.0, 1.2);
  group.add(btn2);

  // Power LED (Red)
  const pwrLedGeo = new THREE.BoxGeometry(0.2, 0.15, 0.2);
  const pwrLedMat = new THREE.MeshStandardMaterial({
    color: virtualPower ? 0xef4444 : 0x450a0a,
    emissive: virtualPower ? 0xef4444 : 0x000000,
    emissiveIntensity: virtualPower ? 1.5 : 0
  });
  const pwrLed = new THREE.Mesh(pwrLedGeo, pwrLedMat);
  pwrLed.position.set(-5.2, 2.0, -1.0);
  pwrLed.name = "power_led";
  group.add(pwrLed);

  // GPIO 2 Onboard LED (Blue)
  const gpio2LedMat = new THREE.MeshStandardMaterial({
    color: (virtualPower && virtualLedState) ? 0x06b6d4 : 0x082f49,
    emissive: (virtualPower && virtualLedState) ? 0x06b6d4 : 0x000000,
    emissiveIntensity: (virtualPower && virtualLedState) ? 2.0 : 0
  });
  const gpio2Led = new THREE.Mesh(pwrLedGeo, gpio2LedMat);
  gpio2Led.position.set(-5.2, 2.0, 1.0);
  gpio2Led.name = "gpio2_led";
  group.add(gpio2Led);

  // Golden Pin Headers (Two rows)
  const pinsPerRow = Math.floor(mcu.pinsCount / 2);
  const pinSpacing = 6.4 / (pinsPerRow - 1);
  const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });

  // Top pin row
  for (let i = 0; i < pinsPerRow; i++) {
    const pin = new THREE.Mesh(pinGeo, pinMat.clone());
    const xPos = -6.4 + (i * pinSpacing);
    const zPos = -1.6;
    pin.position.set(xPos, 1.8, zPos);
    pin.userData = {
      isPin: true,
      mcuPin: true,
      name: mcu.leftPins[i] || `PIN_L${i}`,
      side: 'left',
      index: i
    };
    group.add(pin);
    interactivePins.push(pin);
  }

  // Bottom pin row
  for (let i = 0; i < pinsPerRow; i++) {
    const pin = new THREE.Mesh(pinGeo, pinMat.clone());
    const xPos = -6.4 + (i * pinSpacing);
    const zPos = 1.6;
    pin.position.set(xPos, 1.8, zPos);
    pin.userData = {
      isPin: true,
      mcuPin: true,
      name: mcu.rightPins[i] || `PIN_R${i}`,
      side: 'right',
      index: i
    };
    group.add(pin);
    interactivePins.push(pin);
  }
}

// Procedural Attached Modules
function createAttachedModules3D(group) {
  let offsetX = 3.5;

  attachedModules.forEach((modId, index) => {
    const modGroup = new THREE.Group();
    modGroup.position.set(offsetX, 1.8, 0);

    if (modId === 'rele_1ch') {
      createRelay3D(modGroup);
    } else if (modId === 'dht22') {
      createDht223D(modGroup);
    } else if (modId === 'oled_i2c') {
      createOled3D(modGroup);
    } else if (modId === 'hc_sr04') {
      createUltrasonic3D(modGroup);
    } else if (modId === 'pir_motion') {
      createPir3D(modGroup);
    } else {
      createGenericModule3D(modGroup, modId);
    }

    group.add(modGroup);
    offsetX += 4.5; // space for next module
  });
}

function createRelay3D(group) {
  // PCB Blue Base
  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.2, 2.6),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8 })
  );
  pcb.position.y = 0.1;
  group.add(pcb);

  // Relay Blue Cube
  const cubeMat = new THREE.MeshStandardMaterial({
    color: virtualRelayState ? 0x2563eb : 0x1e40af,
    roughness: 0.4
  });
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.5, 1.8), cubeMat);
  cube.position.set(-0.4, 0.9, 0);
  cube.castShadow = true;
  group.add(cube);

  // Terminal block (green)
  const term = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.9, 2.2),
    new THREE.MeshStandardMaterial({ color: 0x15803d })
  );
  term.position.set(1.1, 0.6, 0);
  group.add(term);

  // Relay Status LED
  const rLedMat = new THREE.MeshStandardMaterial({
    color: virtualRelayState ? 0x22c55e : 0x052e16,
    emissive: virtualRelayState ? 0x22c55e : 0x000000,
    emissiveIntensity: virtualRelayState ? 2.0 : 0
  });
  const rLed = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.2), rLedMat);
  rLed.position.set(-0.8, 0.3, -0.9);
  group.add(rLed);

  // Module Pins
  const pins = ['VCC', 'GND', 'IN'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 })
    );
    pin.position.set(-1.2, 0.4, -0.6 + (i * 0.6));
    pin.userData = { isPin: true, modulePin: true, module: 'rele_1ch', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createDht223D(group) {
  // White slotted housing
  const caseGeo = new THREE.BoxGeometry(2.0, 2.4, 1.4);
  const caseMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
  const caseMesh = new THREE.Mesh(caseGeo, caseMat);
  caseMesh.position.y = 1.3;
  caseMesh.castShadow = true;
  group.add(caseMesh);

  // Pins
  const pins = ['VCC', 'DATA', 'NC', 'GND'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 })
    );
    pin.position.set(-0.6 + (i * 0.4), 0.2, 0);
    pin.userData = { isPin: true, modulePin: true, module: 'dht22', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createOled3D(group) {
  // PCB Blue Base
  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.2, 2.8),
    new THREE.MeshStandardMaterial({ color: 0x1e3a8a })
  );
  pcb.position.y = 0.1;
  group.add(pcb);

  // Glass Screen with Dynamic Canvas Texture
  const screenGeo = new THREE.BoxGeometry(2.4, 0.1, 1.8);
  const screenMat = new THREE.MeshBasicMaterial({ map: oledTexture });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.25, 0.3);
  group.add(screen);

  // 4 Pins on top (VCC, GND, SCL, SDA)
  const pins = ['GND', 'VCC', 'SCL', 'SDA'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 })
    );
    pin.position.set(-0.75 + (i * 0.5), 0.35, -1.1);
    pin.userData = { isPin: true, modulePin: true, module: 'oled_i2c', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createUltrasonic3D(group) {
  // PCB Blue Base
  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(4.0, 0.2, 2.2),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8 })
  );
  pcb.position.y = 0.1;
  group.add(pcb);

  // Two metallic cylinders (Transducer T and R)
  const cylGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.2, 16);
  const cylMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });

  const cyl1 = new THREE.Mesh(cylGeo, cylMat);
  cyl1.rotation.x = Math.PI / 2;
  cyl1.position.set(-1.1, 0.8, 0.3);
  group.add(cyl1);

  const cyl2 = new THREE.Mesh(cylGeo, cylMat);
  cyl2.rotation.x = Math.PI / 2;
  cyl2.position.set(1.1, 0.8, 0.3);
  group.add(cyl2);

  // Pins
  const pins = ['VCC', 'TRIG', 'ECHO', 'GND'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 })
    );
    pin.position.set(-0.75 + (i * 0.5), 0.35, -0.8);
    pin.userData = { isPin: true, modulePin: true, module: 'hc_sr04', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createPir3D(group) {
  // PCB Green Base
  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(3.0, 0.2, 2.4),
    new THREE.MeshStandardMaterial({ color: 0x15803d })
  );
  pcb.position.y = 0.1;
  group.add(pcb);

  // Fresnel white hemisphere dome
  const domeGeo = new THREE.SphereGeometry(1.0, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const domeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, opacity: 0.95, transparent: true });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.set(0, 0.2, 0);
  group.add(dome);

  // Pins
  const pins = ['VCC', 'OUT', 'GND'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 })
    );
    pin.position.set(-0.6 + (i * 0.6), 0.35, 1.0);
    pin.userData = { isPin: true, modulePin: true, module: 'pir_motion', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createGenericModule3D(group, modId) {
  const mod = moduleDatabase.find(m => m.id === modId);
  const colorHex = mod ? parseInt(mod.color.replace('#', '0x')) : 0x06b6d4;

  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.2, 2.5),
    new THREE.MeshStandardMaterial({ color: colorHex })
  );
  pcb.position.y = 0.1;
  group.add(pcb);

  const ic = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.3, 1.0),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 })
  );
  ic.position.set(0, 0.25, 0);
  group.add(ic);

  if (mod && mod.pins) {
    mod.pins.forEach((pName, i) => {
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 })
      );
      pin.position.set(-0.8 + (i * 0.5), 0.35, -1.0);
      pin.userData = { isPin: true, modulePin: true, module: modId, name: pName };
      group.add(pin);
      interactivePins.push(pin);
    });
  }
}

// 3D Realistic Curved Jumpers (Wires)
function createWires3D(group) {
  if (attachedModules.length === 0) return;

  let modXOffset = 3.5;

  attachedModules.forEach(modId => {
    const mod = moduleDatabase.find(m => m.id === modId);
    if (!mod || !mod.defaultEspPins) {
      modXOffset += 4.5;
      return;
    }

    Object.entries(mod.defaultEspPins).forEach(([modPin, espPin], pinIndex) => {
      // Find approximate coordinates
      const startX = -3.5 + (pinIndex * 0.4);
      const startY = 2.1;
      const startZ = espPin.includes('VIN') || espPin.includes('3V3') || espPin.includes('GND') ? 1.6 : -1.6;

      const endX = modXOffset - 1.0 + (pinIndex * 0.5);
      const endY = 2.0;
      const endZ = 0.0;

      // Arc curve midpoint for realistic slack wire
      const midX = (startX + endX) / 2;
      const midY = Math.max(startY, endY) + 2.5 + (pinIndex * 0.4);
      const midZ = (startZ + endZ) / 2 + 1.0;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3(startX, startY + 0.8, startZ),
        new THREE.Vector3(midX, midY, midZ),
        new THREE.Vector3(endX, endY + 0.8, endZ),
        new THREE.Vector3(endX, endY, endZ)
      ]);

      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.06, 8, false);
      const wireColorHex = mod.wireColors && mod.wireColors[modPin] ? parseInt(mod.wireColors[modPin].replace('#', '0x')) : 0xeab308;
      const tubeMat = new THREE.MeshStandardMaterial({
        color: wireColorHex,
        roughness: 0.3,
        metalness: 0.1
      });

      const wireMesh = new THREE.Mesh(tubeGeo, tubeMat);
      wireMesh.castShadow = true;
      group.add(wireMesh);
    });

    modXOffset += 4.5;
  });
}

// Hover & Click Detection
function onMouseMove(event) {
  const container = document.getElementById('canvas-container');
  const rect = container.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactivePins);

  const hoverCard = document.getElementById('pin-hover-card');

  if (intersects.length > 0) {
    const pin = intersects[0].object;
    hoverCard.classList.remove('hidden');
    hoverCard.style.left = `${event.clientX - rect.left}px`;
    hoverCard.style.top = `${event.clientY - rect.top}px`;

    const pinData = pin.userData;
    document.getElementById('hover-pin-name').textContent = pinData.name;
    document.getElementById('hover-pin-type').textContent = pinData.mcuPin ? 'Pino MCU' : 'Pino Módulo';
    document.getElementById('hover-pin-desc').textContent = getPinDescription(pinData.name);
    document.getElementById('hover-pin-volt').textContent = pinData.name.includes('VIN') || pinData.name.includes('5V') ? '5.0V Máx' : '3.3V Máx (Atenção)';
    document.getElementById('hover-pin-status').textContent = 'Pronto para conexão';
  } else {
    hoverCard.classList.add('hidden');
  }
}

function onMouseClick(event) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactivePins);
  if (intersects.length > 0) {
    const pin = intersects[0].object;
    updateInspectorForPin(pin.userData.name);
  }
}

function getPinDescription(pinName) {
  if (pinName.includes('GND')) return 'Terra de Referência (Ground 0V)';
  if (pinName.includes('3V3')) return 'Alimentação Regulada de 3.3V';
  if (pinName.includes('VIN')) return 'Entrada de 5V direto da USB';
  if (pinName.includes('21')) return 'I2C SDA (Dados) / GPIO';
  if (pinName.includes('22')) return 'I2C SCL (Clock) / GPIO';
  if (pinName.includes('23')) return 'SPI MOSI / GPIO';
  if (pinName.includes('19')) return 'SPI MISO / GPIO';
  if (pinName.includes('18')) return 'SPI SCK (Clock) / GPIO';
  if (pinName.includes('2')) return 'LED Onboard / BOOT strapping';
  if (pinName.includes('34') || pinName.includes('35')) return 'Entrada Analógica ADC1 (Apenas Input)';
  return 'GPIO Uso Geral Digital / PWM';
}

function updateInspectorForPin(pinName) {
  const inspectorBody = document.getElementById('inspector-body');
  const desc = getPinDescription(pinName);
  inspectorBody.innerHTML = `
    <div class="p-3 bg-cyan-950/30 border border-cyan-500/40 rounded-xl space-y-1.5">
      <div class="text-xs font-bold text-cyan-300 flex items-center justify-between">
        <span>${pinName}</span>
        <span class="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Selecionado</span>
      </div>
      <p class="text-slate-300 text-[11px] leading-relaxed">${desc}</p>
      <div class="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
        Nível Lógico: <span class="text-white font-semibold">${pinName.includes('5V') || pinName.includes('VIN') ? '5V' : '3.3V'}</span>
      </div>
    </div>
  `;
}

// 3D Controls
function toggleBreadboard() {
  showBreadboard = !showBreadboard;
  document.getElementById('lbl-toggle-bb').textContent = `Protoboard: ${showBreadboard ? 'Ativa' : 'Oculta'}`;
  rebuild3dScene();
}

function toggleWires() {
  showWires = !showWires;
  document.getElementById('lbl-toggle-wires').textContent = showWires ? 'Ligados' : 'Ocultos';
  rebuild3dScene();
}

function toggleAutoRotate() {
  isAutoRotating = !isAutoRotating;
  controls.autoRotate = isAutoRotating;
  controls.autoRotateSpeed = 2.0;
  const btn = document.getElementById('btn-autorotate');
  if (isAutoRotating) {
    btn.classList.add('bg-cyan-600', 'text-white');
  } else {
    btn.classList.remove('bg-cyan-600', 'text-white');
  }
}

function resetCameraView() {
  camera.position.set(0, 16, 22);
  controls.target.set(0, 0, 0);
  controls.update();
  showToast('Câmera 3D resetada.');
}

function onWindowResize() {
  const container = document.getElementById('canvas-container');
  if (!container || !camera || !renderer) return;
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// --- PHYSICAL WIRING GUIDE ("Mundo Real") ---
function updatePhysicalWiringGuide() {
  const tbody = document.getElementById('wiring-table-body');
  const emptyState = document.getElementById('wiring-empty-state');

  if (attachedModules.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  let rowsHtml = '';

  attachedModules.forEach(modId => {
    const mod = moduleDatabase.find(m => m.id === modId);
    if (!mod || !mod.defaultEspPins) return;

    Object.entries(mod.defaultEspPins).forEach(([modPin, espPin]) => {
      const wireHex = (mod.wireColors && mod.wireColors[modPin]) || '#eab308';
      let wireName = 'Amarelo';
      if (wireHex === '#ef4444') wireName = 'Vermelho (VCC)';
      else if (wireHex === '#0f172a' || wireHex === '#451a03') wireName = 'Preto/Marrom (GND)';
      else if (wireHex === '#06b6d4') wireName = 'Azul Claro (Sinal)';
      else if (wireHex === '#a855f7') wireName = 'Roxo (I2C Clock)';
      else if (wireHex === '#3b82f6') wireName = 'Azul (I2C Dados)';
      else if (wireHex === '#10b981') wireName = 'Verde';

      let signalType = 'Digital GPIO';
      if (modPin.includes('VCC') || modPin.includes('5V') || modPin.includes('3V3')) signalType = 'Alimentação (+)';
      else if (modPin.includes('GND')) signalType = 'Terra / Ground (-)';
      else if (modPin.includes('SCL') || modPin.includes('SDA')) signalType = 'Barramento I2C';
      else if (modPin.includes('PWM')) signalType = 'Controle PWM';

      rowsHtml += `
        <tr class="hover:bg-slate-900/60 transition">
          <td class="py-3 px-3">
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-700" style="background-color: ${wireHex}25; color: ${wireHex === '#0f172a' ? '#94a3b8' : wireHex}">
              <span class="w-2 h-2 rounded-full inline-block" style="background-color: ${wireHex}"></span>
              ${wireName}
            </span>
          </td>
          <td class="py-3 px-3 font-semibold text-slate-200">${mod.name}</td>
          <td class="py-3 px-3 text-cyan-300 font-bold">${modPin}</td>
          <td class="py-3 px-3 text-emerald-400 font-bold">${espPin}</td>
          <td class="py-3 px-3 text-slate-400">${signalType}</td>
          <td class="py-3 px-3 text-right">
            <span class="text-emerald-400 text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Pronto</span>
          </td>
        </tr>
      `;
    });
  });

  tbody.innerHTML = rowsHtml;
}

function printWiringGuide() {
  window.print();
}

// --- VIRTUAL SIMULATOR & HARDWARE TESTER ---
function toggleVirtualPower() {
  virtualPower = !virtualPower;
  const btn = document.getElementById('btn-virtual-power');
  const badge = document.getElementById('virtual-power-badge');

  if (virtualPower) {
    btn.textContent = 'DESLIGAR';
    btn.className = 'px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition';
    badge.textContent = 'LIGADO (5V USB)';
    badge.className = 'text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 animate-pulse';
  } else {
    btn.textContent = 'LIGAR';
    btn.className = 'px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition';
    badge.textContent = 'Desligado';
    badge.className = 'text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700';
  }

  rebuild3dScene();
  updateVirtualControls();
  showToast(virtualPower ? 'ESP32 Alimentado! LEDs ativos.' : 'Alimentação desligada.');
}

function toggleOnboardLed() {
  if (!virtualPower) {
    showToast('Ligue a alimentação virtual primeiro!');
    return;
  }
  virtualLedState = !virtualLedState;
  const statusEl = document.getElementById('virtual-led-status');
  const textEl = document.getElementById('virtual-led-text');
  if (virtualLedState) {
    statusEl.className = 'w-2.5 h-2.5 rounded-full bg-cyan-400 shadow shadow-cyan-400 inline-block';
    textEl.textContent = 'ACESO (HIGH)';
  } else {
    statusEl.className = 'w-2.5 h-2.5 rounded-full bg-slate-700 inline-block';
    textEl.textContent = 'Apagado (LOW)';
  }
  rebuild3dScene();
}

function toggleVirtualRelay() {
  if (!virtualPower) {
    showToast('Ligue a alimentação virtual primeiro!');
    return;
  }
  virtualRelayState = !virtualRelayState;
  updateOledTextureText(virtualDhtTemp, virtualDhtHum);
  rebuild3dScene();
  updateVirtualControls();
  showToast(virtualRelayState ? 'Relé ATIVADO (Click - Contato Fechado)' : 'Relé DESATIVADO (Contato Aberto)');
}

function updateVirtualDht(tempVal, humVal) {
  virtualDhtTemp = parseFloat(tempVal);
  virtualDhtHum = parseInt(humVal);
  document.getElementById('lbl-virtual-temp').textContent = `${virtualDhtTemp.toFixed(1)} °C`;
  document.getElementById('lbl-virtual-hum').textContent = `${virtualDhtHum} %`;
  updateOledTextureText(virtualDhtTemp, virtualDhtHum);
}

function updateVirtualControls() {
  const container = document.getElementById('virtual-modules-controls');
  if (!container) return;

  let html = '';

  if (attachedModules.includes('rele_1ch')) {
    html += `
      <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-semibold text-slate-300">Módulo Relé (GPIO 23)</span>
          <button onclick="toggleVirtualRelay()" class="px-2 py-0.5 ${virtualRelayState ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'} rounded text-xs transition">
            ${virtualRelayState ? 'DESATIVAR' : 'ATIVAR'}
          </button>
        </div>
        <div class="text-[11px] text-slate-400">
          Status: <span class="${virtualRelayState ? 'text-blue-400 font-bold' : 'text-slate-500'}">${virtualRelayState ? 'ATIVADO (NO Fechado)' : 'DESLIGADO (COM Aberto)'}</span>
        </div>
      </div>
    `;
  }

  if (attachedModules.includes('dht22')) {
    html += `
      <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
        <div class="text-xs font-semibold text-slate-300">Simulador de Sensor DHT22</div>
        <div>
          <div class="flex justify-between text-[11px] text-slate-400">
            <span>Temperatura:</span>
            <span id="lbl-virtual-temp" class="text-cyan-400 font-bold">${virtualDhtTemp} °C</span>
          </div>
          <input type="range" min="10" max="50" step="0.5" value="${virtualDhtTemp}" oninput="updateVirtualDht(this.value, virtualDhtHum)" class="w-full accent-cyan-500 h-1 bg-slate-800 rounded">
        </div>
        <div>
          <div class="flex justify-between text-[11px] text-slate-400">
            <span>Umidade:</span>
            <span id="lbl-virtual-hum" class="text-cyan-400 font-bold">${virtualDhtHum} %</span>
          </div>
          <input type="range" min="20" max="95" step="1" value="${virtualDhtHum}" oninput="updateVirtualDht(virtualDhtTemp, this.value)" class="w-full accent-cyan-500 h-1 bg-slate-800 rounded">
        </div>
      </div>
    `;
  }

  if (attachedModules.includes('oled_i2c')) {
    html += `
      <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <div class="text-xs font-semibold text-slate-300 mb-1">Display OLED I2C (128x64)</div>
        <div class="text-[11px] text-emerald-400 flex items-center gap-1.5">
          <i class="fa-solid fa-circle-check"></i> Renderizando ao vivo na tela 3D
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

// Open pre-configured simulation in Wokwi
function openWokwiSimulation() {
  // Wokwi URL for ESP32
  const url = "https://wokwi.com/projects/new/esp32";
  window.open(url, '_blank');
  showToast('Abrindo simulador online Wokwi!');
}

// --- FIRMWARE CODE GENERATOR ---
function generateFirmwareCode() {
  const codeOutput = document.getElementById('code-output');
  if (!codeOutput) return;

  let includes = ['#include <Arduino.h>'];
  let defines = [];
  let setupCode = ['  Serial.begin(115200);', '  delay(500);', '  Serial.println("--- ESP32 Lab Iniciado ---");'];
  let loopCode = [];

  // Always enable onboard led
  defines.push('#define LED_ONBOARD 2');
  setupCode.push('  pinMode(LED_ONBOARD, OUTPUT);');

  if (attachedModules.includes('rele_1ch')) {
    defines.push('#define RELAY_PIN 23');
    setupCode.push('  pinMode(RELAY_PIN, OUTPUT);');
    setupCode.push('  digitalWrite(RELAY_PIN, LOW); // Relé desligado');
    loopCode.push('  // Teste de acionamento do Relé');
    loopCode.push('  digitalWrite(RELAY_PIN, HIGH);');
    loopCode.push('  digitalWrite(LED_ONBOARD, HIGH);');
    loopCode.push('  Serial.println("Relé ATIVADO!");');
    loopCode.push('  delay(2000);');
    loopCode.push('  digitalWrite(RELAY_PIN, LOW);');
    loopCode.push('  digitalWrite(LED_ONBOARD, LOW);');
    loopCode.push('  Serial.println("Relé DESLIGADO!");');
    loopCode.push('  delay(2000);');
  }

  if (attachedModules.includes('dht22')) {
    includes.push('#include <DHT.h>');
    defines.push('#define DHTPIN 4');
    defines.push('#define DHTTYPE DHT22');
    defines.push('DHT dht(DHTPIN, DHTTYPE);');
    setupCode.push('  dht.begin();');
    loopCode.push('  float temp = dht.readTemperature();');
    loopCode.push('  float umid = dht.readHumidity();');
    loopCode.push('  Serial.printf("Temperatura: %.1f C | Umidade: %.1f %%\\n", temp, umid);');
  }

  if (attachedModules.includes('oled_i2c')) {
    includes.push('#include <Wire.h>');
    includes.push('#include <Adafruit_GFX.h>');
    includes.push('#include <Adafruit_SSD1306.h>');
    defines.push('#define SCREEN_WIDTH 128');
    defines.push('#define SCREEN_HEIGHT 64');
    defines.push('Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);');
    setupCode.push('  Wire.begin(21, 22); // SDA, SCL');
    setupCode.push('  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {');
    setupCode.push('    Serial.println("Falha ao iniciar OLED SSD1306");');
    setupCode.push('  } else {');
    setupCode.push('    display.clearDisplay();');
    setupCode.push('    display.setTextSize(1);');
    setupCode.push('    display.setTextColor(WHITE);');
    setupCode.push('    display.setCursor(0, 10);');
    setupCode.push('    display.println("ESP32 3D Lab");');
    setupCode.push('    display.display();');
    setupCode.push('  }');
  }

  if (loopCode.length === 0) {
    loopCode.push('  // Piscar LED onboard para indicar funcionamento');
    loopCode.push('  digitalWrite(LED_ONBOARD, HIGH);');
    loopCode.push('  delay(500);');
    loopCode.push('  digitalWrite(LED_ONBOARD, LOW);');
    loopCode.push('  delay(500);');
  }

  const fullCode = `// ==========================================
// Código Firmware para ESP32 DevKit
// Gerado por ESP32 3D Lab & Studio
// ==========================================

${includes.join('\n')}

${defines.join('\n')}

void setup() {
${setupCode.join('\n')}
}

void loop() {
${loopCode.join('\n')}
}
`;

  codeOutput.textContent = fullCode;
}

function copyGeneratedCode() {
  const code = document.getElementById('code-output').textContent;
  navigator.clipboard.writeText(code).then(() => {
    showToast('Código copiado para a área de transferência!');
  });
}

// --- DATABASE CATALOG EXPLORER ---
function renderDatabaseExplorer() {
  const container = document.getElementById('database-grid');
  if (!container) return;

  container.innerHTML = moduleDatabase.map(mod => {
    return `
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition flex flex-col justify-between shadow-lg">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow" style="background-color: ${mod.color}">
              <i class="fa-solid ${mod.icon}"></i>
            </div>
            <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-400">
              ${mod.voltage}
            </span>
          </div>
          <h3 class="font-bold text-sm text-white">${mod.name}</h3>
          <p class="text-xs text-slate-400 mt-1 leading-relaxed">${mod.desc}</p>
          
          <div class="mt-3 pt-3 border-t border-slate-800/80">
            <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">Pinos do Módulo:</span>
            <div class="flex flex-wrap gap-1">
              ${mod.pins.map(p => `<span class="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-cyan-300 font-mono border border-slate-800">${p}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 flex items-center justify-between border-t border-slate-800">
          <span class="text-[11px] capitalize text-slate-500"><i class="fa-solid fa-tag text-cyan-500 mr-1"></i>${mod.category}</span>
          <button onclick="attachModule('${mod.id}'); switchView('3d')" class="px-3 py-1 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white rounded-lg text-xs font-semibold transition">
            Usar no 3D
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Modal handlers for new module
function openNewModuleModal() {
  document.getElementById('modal-new-module').classList.remove('hidden');
}

function closeNewModuleModal() {
  document.getElementById('modal-new-module').classList.add('hidden');
}

function saveNewModule() {
  const name = document.getElementById('new-mod-name').value.trim();
  const category = document.getElementById('new-mod-cat').value;
  const voltage = document.getElementById('new-mod-voltage').value;
  const pinsRaw = document.getElementById('new-mod-pins').value.trim();
  const desc = document.getElementById('new-mod-desc').value.trim();

  if (!name || !pinsRaw) {
    showToast('Preencha pelo menos o Nome e os Pinos!');
    return;
  }

  const pins = pinsRaw.split(',').map(p => p.trim()).filter(p => p.length > 0);
  const newMod = {
    id: 'mod_' + Date.now(),
    name,
    category,
    voltage,
    color: '#06b6d4',
    icon: category === 'sensor' ? 'fa-satellite-dish' : 'fa-microchip',
    pins,
    desc: desc || 'Módulo cadastrado pelo usuário.',
    defaultEspPins: { [pins[0]]: '3V3', [pins[pins.length - 1]]: 'GND' }
  };

  moduleDatabase.push(newMod);
  saveDatabase();
  renderCatalog();
  renderDatabaseExplorer();
  closeNewModuleModal();
  showToast(`Módulo "${name}" salvo com sucesso no banco!`);
}

// Export / Import
function exportProjectData() {
  const exportPayload = {
    version: '1.0',
    timestamp: new Date().toISOString(),
    mcu: currentMcuId,
    attachedModules,
    customDatabase: moduleDatabase
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `esp32_lab_backup_${Date.now()}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
  showToast('Backup JSON exportado com sucesso!');
}

// Toast notification helper
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  toastMsg.textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}
