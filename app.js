// ESP32 & Módulos 3D Lab - Ultra Real Engine & Interactive Teaching Guide

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
    leftPins: ['EN', 'VP', 'VN', 'D34', 'D35', 'D32', 'D33', 'D25', 'D26', 'D27', 'D14', 'D12', 'D13', 'GND', 'VIN'],
    rightPins: ['D23', 'D22', 'TX0', 'RX0', 'D21', 'D19', 'D18', 'D5', 'TX2', 'RX2', 'D4', 'D2', 'D15', 'GND', '3V3']
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
    leftPins: ['3V3', 'EN', 'VP', 'VN', 'D34', 'D35', 'D32', 'D33', 'D25', 'D26', 'D27', 'D14', 'D12', 'GND', 'D13', 'D9', 'D10', 'D11', 'VIN'],
    rightPins: ['GND', 'D23', 'D22', 'TX0', 'RX0', 'D21', 'D19', 'D18', 'D5', 'TX2', 'RX2', 'D4', 'D2', 'D15', 'D8', 'D7', 'D6', 'CLK', 'CMD']
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
    leftPins: ['A0', 'RSV', 'RSV', 'SD3', 'SD2', 'SD1', 'CMD', 'SD0', 'CLK', 'GND', '3V3', 'EN', 'RST', 'GND', 'VIN'],
    rightPins: ['D0', 'D1', 'D2', 'D3', 'D4', '3V3', 'GND', 'D5', 'D6', 'D7', 'D8', 'RX', 'TX', 'GND', '3V3']
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

// --- Default Database of Sensors & Modules with Educational Tutorials ---
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
    desc: 'Permite acionar cargas de alta tensão (lâmpadas, motores, fechaduras) via sinal digital.',
    tutorialSteps: [
      {
        title: 'Posicionamento Físico',
        wireName: 'Encaixe na Bancada',
        wireColor: '#3b82f6',
        sourcePin: 'Bancada',
        destPin: 'Ao lado do ESP32',
        wireType: 'Fixação Mecânica',
        explanation: 'Posicione o módulo relé deixando cerca de 5cm de distância do ESP32 na bancada ou protoboard. Isso garante espaço livre para os cabos jumper e previne ruídos eletromagnéticos da bobina do relé.'
      },
      {
        title: 'Alimentação Positiva (VCC)',
        wireName: 'Fio Vermelho (VCC)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: VIN (5V)',
        destPin: 'Relé: VCC',
        wireType: 'Macho-Fêmea',
        explanation: 'A bobina mecânica do relé precisa de 5V para atracar com força total. Conecte o fio vermelho do pino VIN do ESP32 (que recebe 5V direto da USB) ao pino VCC do relé.'
      },
      {
        title: 'Aterramento (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'ESP32: GND',
        destPin: 'Relé: GND',
        wireType: 'Macho-Fêmea',
        explanation: 'Conecte o fio preto do pino GND do ESP32 ao pino GND do módulo relé. O terra comum é essencial para fechar o circuito elétrico e garantir o nível de 0V.'
      },
      {
        title: 'Sinal de Controle Digital (IN)',
        wireName: 'Fio Amarelo (Sinal)',
        wireColor: '#eab308',
        sourcePin: 'ESP32: GPIO 23',
        destPin: 'Relé: IN',
        wireType: 'Macho-Fêmea',
        explanation: 'Conecte o fio amarelo do pino GPIO 23 do ESP32 ao pino IN do relé. Quando o seu código mandar sinal HIGH (3.3V), o relé atravará ligando a carga conectada.'
      }
    ]
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
    desc: 'Mede temperatura (-40 a 80°C) e umidade com alta precisão digital.',
    tutorialSteps: [
      {
        title: 'Posicionamento Físico',
        wireName: 'Encaixe na Protoboard',
        wireColor: '#10b981',
        sourcePin: 'Protoboard',
        destPin: 'Trilhas E-J',
        wireType: 'Encaixe 4 Pinos',
        explanation: 'Encaixe o sensor DHT22 verticalmente na protoboard, com as ranhuras de ventilação viradas para frente para permitir a circulação de ar.'
      },
      {
        title: 'Alimentação 3.3V (VCC)',
        wireName: 'Fio Vermelho (3.3V)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: 3V3',
        destPin: 'DHT22: Pino 1 (VCC)',
        wireType: 'Macho-Macho',
        explanation: 'O DHT22 trabalha perfeitamente com a tensão nativa de 3.3V do ESP32. Ligue o pino 3V3 do ESP ao Pino 1 (VCC) do sensor.'
      },
      {
        title: 'Linha de Dados Digital',
        wireName: 'Fio Azul Claro (DATA)',
        wireColor: '#06b6d4',
        sourcePin: 'ESP32: GPIO 4',
        destPin: 'DHT22: Pino 2 (DATA)',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o fio azul do GPIO 4 do ESP ao Pino 2 (DATA) do sensor. A biblioteca lê os pulsos digitais de temperatura e umidade através desta linha.'
      },
      {
        title: 'Aterramento (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'ESP32: GND',
        destPin: 'DHT22: Pino 4 (GND)',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o fio preto do pino GND do ESP ao Pino 4 (GND) do sensor. (Nota: o Pino 3 do DHT22 não é conectado / NC).'
      }
    ]
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
    desc: 'Tela gráfica monocromática 128x64 pixels comunicando via barramento I2C.',
    tutorialSteps: [
      {
        title: 'Posicionamento do Display',
        wireName: 'Encaixe na Protoboard',
        wireColor: '#06b6d4',
        sourcePin: 'Protoboard',
        destPin: 'Área Superior',
        wireType: 'Conector 4 Pinos',
        explanation: 'Fixe o display OLED na protoboard deixando a tela visível para facilitar a leitura dos dados durante os testes.'
      },
      {
        title: 'Alimentação 3.3V (VCC)',
        wireName: 'Fio Vermelho (VCC)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: 3V3',
        destPin: 'OLED: VCC',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o fio vermelho do pino 3V3 do ESP ao VCC do OLED. A tela funciona diretamente com a lógica de 3.3V.'
      },
      {
        title: 'Aterramento (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'ESP32: GND',
        destPin: 'OLED: GND',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o fio preto do pino GND do ESP ao pino GND do display OLED.'
      },
      {
        title: 'Barramento I2C - Linha de Dados (SDA)',
        wireName: 'Fio Azul (SDA)',
        wireColor: '#3b82f6',
        sourcePin: 'ESP32: GPIO 21',
        destPin: 'OLED: SDA',
        wireType: 'Macho-Macho',
        explanation: 'O pino GPIO 21 é o canal de dados I2C nativo padrão do ESP32. Ele transfere os pixels da tela.'
      },
      {
        title: 'Barramento I2C - Linha de Clock (SCL)',
        wireName: 'Fio Roxo (SCL)',
        wireColor: '#a855f7',
        sourcePin: 'ESP32: GPIO 22',
        destPin: 'OLED: SCL',
        wireType: 'Macho-Macho',
        explanation: 'O pino GPIO 22 é o canal de sincronismo de clock I2C do ESP32. Ele sincroniza o envio dos comandos à tela.'
      }
    ]
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
    desc: 'Mede distância de 2cm a 400cm via ondas sonoras de alta frequência.',
    tutorialSteps: [
      {
        title: 'Posicionamento dos Transdutores',
        wireName: 'Encaixe Frontal',
        wireColor: '#8b5cf6',
        sourcePin: 'Protoboard',
        destPin: 'Borda Livre',
        wireType: 'Encaixe 4 Pinos',
        explanation: 'Posicione o sensor com os dois cilindros (olhos ultrassônicos) voltados para frente, livres de obstáculos a pelo menos 10cm.'
      },
      {
        title: 'Alimentação 5V (VCC)',
        wireName: 'Fio Vermelho (5V)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: VIN (5V)',
        destPin: 'HC-SR04: VCC',
        wireType: 'Macho-Macho',
        explanation: 'O emissor ultrassônico precisa de 5V estável para alcançar distância confiável. Conecte ao pino VIN do ESP32.'
      },
      {
        title: 'Aterramento (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'ESP32: GND',
        destPin: 'HC-SR04: GND',
        wireType: 'Macho-Macho',
        explanation: 'Conecte o fio preto do GND do ESP32 ao GND do sensor para fechar o terra.'
      },
      {
        title: 'Gatilho de Disparo (TRIG)',
        wireName: 'Fio Verde (TRIG)',
        wireColor: '#10b981',
        sourcePin: 'ESP32: GPIO 5',
        destPin: 'HC-SR04: TRIG',
        wireType: 'Macho-Macho',
        explanation: 'O pino GPIO 5 envia um pulso de 10 microssegundos para o sensor disparar o sinal sonoro de 40kHz.'
      },
      {
        title: 'Retorno do Eco (ECHO)',
        wireName: 'Fio Laranja (ECHO)',
        wireColor: '#f59e0b',
        sourcePin: 'ESP32: GPIO 18',
        destPin: 'HC-SR04: ECHO',
        wireType: 'Macho-Macho',
        explanation: 'O pino ECHO envia de volta um pulso proporcional ao tempo de viagem do som. Conecte ao GPIO 18.'
      }
    ]
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
    desc: 'Detecta movimento e presença humana através da variação infravermelha.',
    tutorialSteps: [
      {
        title: 'Posicionamento do Domo Fresnel',
        wireName: 'Fixação da Lente',
        wireColor: '#f97316',
        sourcePin: 'Bancada',
        destPin: 'Frente Aberta',
        wireType: 'Macho-Fêmea',
        explanation: 'Posicione a cúpula branca virada para a direção que deseja monitorar. Mantenha longe de fontes diretas de calor ou ventiladores.'
      },
      {
        title: 'Alimentação 5V (VCC)',
        wireName: 'Fio Vermelho (5V)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: VIN (5V)',
        destPin: 'PIR: VCC',
        wireType: 'Macho-Fêmea',
        explanation: 'O sensor PIR possui um regulador interno que aceita 5V a 12V. Ligue ao pino VIN do seu ESP32.'
      },
      {
        title: 'Aterramento (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'ESP32: GND',
        destPin: 'PIR: GND',
        wireType: 'Macho-Fêmea',
        explanation: 'Ligue o fio preto do GND do ESP32 ao GND do sensor PIR.'
      },
      {
        title: 'Saída Digital de Detecção (OUT)',
        wireName: 'Fio Rosa (OUT)',
        wireColor: '#ec4899',
        sourcePin: 'ESP32: GPIO 19',
        destPin: 'PIR: OUT',
        wireType: 'Macho-Fêmea',
        explanation: 'Quando alguém se movimentar, o pino OUT sobe para 3.3V (HIGH). Ligue ao pino GPIO 19 do ESP.'
      }
    ]
  },
  {
    id: 'sg90_servo',
    name: 'Micro Servo Motor (SG90 9g)',
    category: 'atuador',
    voltage: '5V',
    color: '#eab308',
    icon: 'fa-gear',
    pins: ['VCC', 'GND', 'PWM'],
    defaultEspPins: { 'VCC': 'VIN (5V)', 'GND': 'GND', 'PWM': 'GPIO 13' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#451a03', 'PWM': '#f97316' },
    desc: 'Motor com rotação angular precisa de 0° a 180° com pulsos PWM.',
    tutorialSteps: [
      {
        title: 'Fixação Mecânica do Servo',
        wireName: 'Eixo Livre',
        wireColor: '#eab308',
        sourcePin: 'Bancada',
        destPin: 'Espaço 180°',
        wireType: 'Cabo 3 Vias',
        explanation: 'Deixe o eixo de plástico e a cruzeta livres de obstáculos para que possa girar suavemente de 0 a 180 graus sem travar o motor.'
      },
      {
        title: 'Alimentação do Motor (Fio Vermelho)',
        wireName: 'Cabo Vermelho (5V)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: VIN (5V)',
        destPin: 'Servo: Vermelho',
        wireType: 'Macho-Fêmea',
        explanation: 'Os motores consomem corrente significativa. Ligue o cabo vermelho do servo ao pino VIN (5V USB) para não sobrecarregar o regulador de 3.3V.'
      },
      {
        title: 'Aterramento (Fio Marrom)',
        wireName: 'Cabo Marrom (GND)',
        wireColor: '#451a03',
        sourcePin: 'ESP32: GND',
        destPin: 'Servo: Marrom',
        wireType: 'Macho-Fêmea',
        explanation: 'No padrão de cores de servomotores, o cabo marrom é o GND. Conecte ao pino GND do ESP32.'
      },
      {
        title: 'Sinal PWM de Posição (Fio Laranja)',
        wireName: 'Cabo Laranja (PWM)',
        wireColor: '#f97316',
        sourcePin: 'ESP32: GPIO 13',
        destPin: 'Servo: Laranja',
        wireType: 'Macho-Fêmea',
        explanation: 'Conecte o cabo laranja ao pino GPIO 13 do ESP32. Os pulsos de largura (1ms a 2ms) definirão o ângulo exato do motor.'
      }
    ]
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

// Tutorial Mode State
let tutorialState = {
  active: false,
  moduleId: null,
  currentStep: 0,
  steps: []
};

// Virtual simulation states
let virtualPower = false;
let virtualLedState = false;
let virtualRelayState = false;
let virtualDhtTemp = 24.5;
let virtualDhtHum = 58;

// --- Three.js Globals ---
let scene, camera, renderer, controls;
let mcuMeshGroup, breadboardMeshGroup, modulesMeshGroup, wiresMeshGroup, tutorialHighlightGroup;
let raycaster, mouse;
let interactivePins = [];
let oledCanvas, oledTexture;
let cuttingMatTexture, espSilkscreenTexture, shieldLaserTexture;

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
  const saved = localStorage.getItem('esp32_lab_custom_db_v2');
  if (saved) {
    try {
      moduleDatabase = JSON.parse(saved);
    } catch (e) {
      moduleDatabase = [...DEFAULT_MODULE_DATABASE];
    }
  } else {
    moduleDatabase = [...DEFAULT_MODULE_DATABASE];
  }

  // Default start with Relay
  attachedModules = ['rele_1ch'];
}

function saveDatabase() {
  localStorage.setItem('esp32_lab_custom_db_v2', JSON.stringify(moduleDatabase));
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
  showToast('Módulo adicionado à bancada!');
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
  closeTutorialMode();
  renderAttachedModules();
  rebuild3dScene();
  updatePhysicalWiringGuide();
  generateFirmwareCode();
  updateVirtualControls();
  showToast('Todos os módulos foram removidos da bancada.');
}

function renderAttachedModules() {
  const container = document.getElementById('attached-modules-list');
  const countEl = document.getElementById('attached-count');
  countEl.textContent = attachedModules.length;

  if (attachedModules.length === 0) {
    container.innerHTML = `
      <div class="text-[11px] text-slate-500 text-center py-4 border border-dashed border-slate-800 rounded-xl">
        Nenhum módulo na bancada.<br>Selecione um no catálogo abaixo.
      </div>
    `;
    return;
  }

  container.innerHTML = attachedModules.map(modId => {
    const mod = moduleDatabase.find(m => m.id === modId);
    if (!mod) return '';
    return `
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-white shadow" style="background-color: ${mod.color}">
            <i class="fa-solid ${mod.icon}"></i>
          </div>
          <div>
            <div class="text-xs font-semibold text-slate-200">${mod.name}</div>
            <div class="text-[10px] text-cyan-400 font-mono">${mod.voltage} • ${mod.pins.length} pinos</div>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button onclick="startTeachingModule('${mod.id}')" class="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1 transition" title="Me ensine a montar este módulo">
            <i class="fa-solid fa-graduation-cap"></i> Ensinar
          </button>
          <button onclick="detachModule('${mod.id}')" class="text-slate-500 hover:text-rose-400 p-1.5 text-xs transition" title="Remover">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
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
      <div class="p-3 rounded-xl border ${isAttached ? 'border-cyan-500/60 bg-cyan-950/20' : 'border-slate-800 bg-slate-950 hover:border-slate-700'} transition flex flex-col gap-2 group">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-white shadow" style="background-color: ${mod.color}">
              <i class="fa-solid ${mod.icon}"></i>
            </div>
            <div>
              <div class="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition">${mod.name}</div>
              <div class="text-[10px] text-slate-400 flex items-center gap-1.5">
                <span class="capitalize">${mod.category}</span>
                <span>•</span>
                <span class="text-amber-400 font-mono">${mod.voltage}</span>
              </div>
            </div>
          </div>

          <button onclick="${isAttached ? `detachModule('${mod.id}')` : `attachModule('${mod.id}')`}" 
                  class="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${isAttached ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 hover:bg-rose-950 hover:text-rose-300 hover:border-rose-800' : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'}">
            ${isAttached ? '<i class="fa-solid fa-check mr-1"></i> Na Bancada' : '<i class="fa-solid fa-plus mr-1"></i> Adicionar'}
          </button>
        </div>

        <!-- Teach Me Button -->
        <div class="pt-1.5 border-t border-slate-900/80 flex items-center justify-between">
          <span class="text-[10px] text-slate-500">${mod.pins.length} conexões</span>
          <button onclick="startTeachingModule('${mod.id}')" class="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-amber-950/40 border border-amber-800/60 px-2.5 py-0.5 rounded-lg transition shadow-sm">
            <i class="fa-solid fa-graduation-cap text-xs"></i> Me Ensine Onde Colocar
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterCatalog() {
  const query = document.getElementById('catalog-search').value;
  renderCatalog(query);
}

// --- INTERACTIVE TEACHING / STEP-BY-STEP TUTORIAL ENGINE ---
function startTeachingModule(moduleId) {
  const mod = moduleDatabase.find(m => m.id === moduleId);
  if (!mod) return;

  // Make sure module is attached so we can see it
  if (!attachedModules.includes(moduleId)) {
    attachedModules.push(moduleId);
    renderAttachedModules();
    renderCatalog();
  }

  // Switch to 3D View
  switchView('3d');

  tutorialState.active = true;
  tutorialState.moduleId = moduleId;
  tutorialState.currentStep = 0;
  tutorialState.steps = mod.tutorialSteps || generateDefaultTutorialSteps(mod);

  // Show Tutorial HUD
  const hud = document.getElementById('tutorial-hud');
  hud.classList.remove('hidden');

  renderCurrentTutorialStep();
  rebuild3dScene();
  focusCameraOnStep();
  showToast(`Iniciando tutorial passo a passo: ${mod.name}`);
}

function generateDefaultTutorialSteps(mod) {
  const steps = [
    {
      title: 'Posicionamento Físico',
      wireName: 'Encaixe na Bancada',
      wireColor: '#3b82f6',
      sourcePin: 'Bancada',
      destPin: mod.name,
      wireType: 'Fixação Física',
      explanation: `Posicione o ${mod.name} ao lado do seu microcontrolador com espaço suficiente para passar os fios jumpers sem tensão excessiva.`
    }
  ];

  if (mod.defaultEspPins) {
    Object.entries(mod.defaultEspPins).forEach(([modPin, espPin]) => {
      const color = (mod.wireColors && mod.wireColors[modPin]) || '#eab308';
      let wireType = 'Cabo Jumper Macho-Fêmea';
      let explanation = `Ligue o pino ${espPin} do ESP ao pino ${modPin} do módulo.`;

      if (modPin.includes('VCC') || modPin.includes('5V') || modPin.includes('3V3')) {
        explanation = `Alimentação positiva: Conecte o pino de energia ${espPin} do ESP ao pino ${modPin} do módulo.`;
      } else if (modPin.includes('GND')) {
        explanation = `Aterramento comum: Conecte o pino GND do ESP ao GND do módulo para equalizar a referência de 0V.`;
      }

      steps.push({
        title: `Conexão do Pino ${modPin}`,
        wireName: `Fio ${getWireColorName(color)}`,
        wireColor: color,
        sourcePin: `ESP: ${espPin}`,
        destPin: `Módulo: ${modPin}`,
        wireType,
        explanation
      });
    });
  }

  return steps;
}

function getWireColorName(hex) {
  if (hex === '#ef4444') return 'Vermelho (VCC)';
  if (hex === '#0f172a' || hex === '#451a03') return 'Preto/Marrom (GND)';
  if (hex === '#06b6d4') return 'Azul Claro (Dados)';
  if (hex === '#a855f7') return 'Roxo (Clock I2C)';
  if (hex === '#3b82f6') return 'Azul (Dados I2C)';
  if (hex === '#10b981') return 'Verde (Sinal)';
  if (hex === '#eab308') return 'Amarelo (Sinal)';
  if (hex === '#f97316') return 'Laranja (PWM)';
  return 'Colorido';
}

function renderCurrentTutorialStep() {
  const step = tutorialState.steps[tutorialState.currentStep];
  const mod = moduleDatabase.find(m => m.id === tutorialState.moduleId);
  if (!step || !mod) return;

  document.getElementById('tut-module-name').textContent = `Ensinando: ${mod.name}`;
  document.getElementById('tut-step-counter').textContent = `Passo ${tutorialState.currentStep + 1} de ${tutorialState.steps.length}`;
  document.getElementById('tut-module-sub').textContent = step.title;

  const wireBadge = document.getElementById('tut-wire-badge');
  wireBadge.innerHTML = `<span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color: ${step.wireColor}"></span> ${step.wireName}`;
  wireBadge.style.borderColor = step.wireColor;

  document.getElementById('tut-source-pin').textContent = step.sourcePin;
  document.getElementById('tut-dest-pin').textContent = step.destPin;
  document.getElementById('tut-explanation').textContent = step.explanation;
  document.getElementById('tut-wire-kind').textContent = step.wireType;

  // Dots
  const dotsContainer = document.getElementById('tut-dots-container');
  dotsContainer.innerHTML = tutorialState.steps.map((_, i) => {
    return `<span class="w-2.5 h-2.5 rounded-full transition-all ${i === tutorialState.currentStep ? 'bg-amber-400 w-5' : (i < tutorialState.currentStep ? 'bg-emerald-500' : 'bg-slate-700')}"></span>`;
  }).join('');

  // Buttons state
  const prevBtn = document.getElementById('tut-btn-prev');
  const nextBtn = document.getElementById('tut-btn-next');

  if (tutorialState.currentStep === 0) {
    prevBtn.classList.add('opacity-40', 'pointer-events-none');
  } else {
    prevBtn.classList.remove('opacity-40', 'pointer-events-none');
  }

  if (tutorialState.currentStep === tutorialState.steps.length - 1) {
    nextBtn.innerHTML = '<span>Concluir Montagem!</span> <i class="fa-solid fa-check"></i>';
    nextBtn.className = 'px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition';
  } else {
    nextBtn.innerHTML = '<span>Próximo Passo</span> <i class="fa-solid fa-chevron-right"></i>';
    nextBtn.className = 'px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition';
  }
}

function tutorialNextStep() {
  if (tutorialState.currentStep < tutorialState.steps.length - 1) {
    tutorialState.currentStep++;
    renderCurrentTutorialStep();
    rebuild3dScene();
    focusCameraOnStep();
  } else {
    showToast('Parabéns! Você concluiu toda a montagem física deste módulo!');
    closeTutorialMode();
  }
}

function tutorialPrevStep() {
  if (tutorialState.currentStep > 0) {
    tutorialState.currentStep--;
    renderCurrentTutorialStep();
    rebuild3dScene();
    focusCameraOnStep();
  }
}

function closeTutorialMode() {
  tutorialState.active = false;
  tutorialState.moduleId = null;
  document.getElementById('tutorial-hud').classList.add('hidden');
  rebuild3dScene();
}

function focusCameraOnStep() {
  // Smoothly adjust camera to highlight the active module and pins
  if (tutorialState.currentStep === 0) {
    // Overview of module placement
    camera.position.set(2, 14, 18);
  } else {
    // Zoom in on connections
    camera.position.set(0, 11, 15);
  }
  controls.target.set(0, 1.5, 0);
  controls.update();
}

// --- TEXTURE GENERATORS FOR ULTRA-REALISM ---

// Realistic Cutting Mat (Bancada de Laboratório Maker)
function generateCuttingMatTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Dark ESD Anti-static mat green/slate
  ctx.fillStyle = '#0a1d1c';
  ctx.fillRect(0, 0, 1024, 1024);

  // Border frame
  ctx.strokeStyle = '#14b8a6';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 984, 984);

  // 10mm and 50mm Grid lines
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.15)';
  ctx.lineWidth = 1;
  for (let x = 40; x < 1000; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, 1004);
    ctx.stroke();
  }
  for (let y = 40; y < 1000; y += 20) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(1004, y);
    ctx.stroke();
  }

  // Major 50mm lines
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)';
  ctx.lineWidth = 2;
  for (let x = 40; x < 1000; x += 100) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, 1004);
    ctx.stroke();
  }
  for (let y = 40; y < 1000; y += 100) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(1004, y);
    ctx.stroke();
  }

  // Angle guide lines (30°, 45°, 60°)
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(512, 512);
  ctx.lineTo(950, 950); // 45 deg
  ctx.moveTo(512, 512);
  ctx.lineTo(75, 950);
  ctx.stroke();

  // Degree circles
  ctx.beginPath();
  ctx.arc(512, 512, 180, 0, Math.PI * 2);
  ctx.arc(512, 512, 320, 0, Math.PI * 2);
  ctx.stroke();

  // Silkscreen text on mat
  ctx.fillStyle = 'rgba(20, 184, 166, 0.7)';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('ELECTRONICS WORKBENCH - ESD SAFE', 50, 60);
  ctx.fillText('10mm GRID / METRIC SCALE', 720, 60);
  ctx.font = '12px monospace';
  ctx.fillText('ESP32 3D LAB & STUDIO v2.0', 50, 980);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Ultra-Detailed ESP32 PCB Silkscreen Texture
function generateEsp32SilkscreenTexture(mcu) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Matte Black PCB background
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, 1024, 512);

  // Subtle copper trace texture
  ctx.strokeStyle = 'rgba(217, 119, 6, 0.15)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(100 + i * 40, 100);
    ctx.lineTo(150 + i * 40, 200);
    ctx.lineTo(250 + i * 40, 200);
    ctx.stroke();
  }

  // Serpentine PCB Antenna in Gold
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(920, 160);
  for (let k = 0; k < 6; k++) {
    ctx.lineTo(920 + (k % 2 === 0 ? 40 : 0), 160 + k * 30);
  }
  ctx.stroke();

  // White Silkscreen Border
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(30, 30, 964, 452);

  // Pin Labels (Left / Top Row)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 17px monospace';
  ctx.textAlign = 'center';

  const leftPins = mcu.leftPins;
  const xStart = 80;
  const xSpacing = 860 / (leftPins.length - 1);

  leftPins.forEach((pinName, i) => {
    const x = xStart + (i * xSpacing);
    ctx.fillText(pinName, x, 75);
    // Draw golden pad circle around pin through-hole
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, 105, 12, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Pin Labels (Right / Bottom Row)
  const rightPins = mcu.rightPins;
  rightPins.forEach((pinName, i) => {
    const x = xStart + (i * xSpacing);
    ctx.fillText(pinName, x, 445);
    // Draw golden pad circle around pin through-hole
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, 405, 12, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Center ESP32 Logo
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('ESP32 DEVKIT V1', 450, 230);
  ctx.font = '14px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('NodeMCU-32S • 2.4GHz Wi-Fi + BLE', 450, 260);

  return new THREE.CanvasTexture(canvas);
}

// ESP-WROOM-32 Metallic Laser Engraving Texture
function generateShieldLaserTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Brushed aluminum metallic grey
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, 512, 512);

  // Laser engraved dark grey text
  ctx.fillStyle = '#334155';
  ctx.textAlign = 'center';

  // Espressif Logo Text
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('ESPRESSIF', 256, 120);

  ctx.font = 'bold 44px sans-serif';
  ctx.fillText('ESP-WROOM-32', 256, 180);

  ctx.font = '18px monospace';
  ctx.fillText('FCC ID: 2AC7Z-ESPWROOM32', 256, 240);
  ctx.fillText('CE 1313 • Wi-Fi & Bluetooth', 256, 275);
  ctx.fillText('Espressif Systems (Shanghai)', 256, 310);

  // QR Code / Data Matrix silhouette placeholder
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(216, 340, 80, 80);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(226, 350, 20, 20);
  ctx.fillRect(256, 380, 20, 20);

  return new THREE.CanvasTexture(canvas);
}

// Dynamic OLED Screen Texture
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

// --- THREE.JS 3D SCENE INITIALIZATION & RENDERING ---
function initThreeJs() {
  const container = document.getElementById('canvas-container');
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020617); // Dark Slate 950
  scene.fog = new THREE.FogExp2(0x020617, 0.02);

  // Camera
  camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
  camera.position.set(0, 16, 22);

  // Renderer with ACESFilmicToneMapping for Photorealistic Colors
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  container.appendChild(renderer.domElement);

  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.maxPolarAngle = Math.PI / 2.05; // Prevent camera under floor
  controls.minDistance = 4;
  controls.maxDistance = 55;

  // Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  // Main Desk Key Light
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.4);
  mainLight.position.set(12, 28, 16);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 70;
  mainLight.shadow.bias = -0.0005;
  scene.add(mainLight);

  // Soft Warm Lamp Fill Light
  const warmLamp = new THREE.DirectionalLight(0xfef08a, 0.5);
  warmLamp.position.set(-15, 18, -10);
  scene.add(warmLamp);

  // Cyan & Amber Accent Glows for Maker Atmosphere
  const cyanGlow = new THREE.PointLight(0x06b6d4, 1.8, 35);
  cyanGlow.position.set(-10, 8, 8);
  scene.add(cyanGlow);

  const amberGlow = new THREE.PointLight(0xf59e0b, 1.4, 35);
  amberGlow.position.set(12, 8, -6);
  scene.add(amberGlow);

  // Create High-Res Textures
  cuttingMatTexture = generateCuttingMatTexture();
  setupOledDynamicTexture();

  // Create Realistic Workbench Cutting Mat
  const matGeo = new THREE.PlaneGeometry(55, 45);
  const matMaterial = new THREE.MeshStandardMaterial({
    map: cuttingMatTexture,
    roughness: 0.7,
    metalness: 0.05
  });
  const cuttingMat = new THREE.Mesh(matGeo, matMaterial);
  cuttingMat.rotation.x = -Math.PI / 2;
  cuttingMat.position.y = -0.02;
  cuttingMat.receiveShadow = true;
  scene.add(cuttingMat);

  // Raycaster & Mouse
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('click', onMouseClick);

  // Build Scene
  rebuild3dScene();

  // Animation Loop
  animate();
}

function rebuild3dScene() {
  if (mcuMeshGroup) scene.remove(mcuMeshGroup);
  if (breadboardMeshGroup) scene.remove(breadboardMeshGroup);
  if (modulesMeshGroup) scene.remove(modulesMeshGroup);
  if (wiresMeshGroup) scene.remove(wiresMeshGroup);
  if (tutorialHighlightGroup) scene.remove(tutorialHighlightGroup);

  interactivePins = [];

  mcuMeshGroup = new THREE.Group();
  breadboardMeshGroup = new THREE.Group();
  modulesMeshGroup = new THREE.Group();
  wiresMeshGroup = new THREE.Group();
  tutorialHighlightGroup = new THREE.Group();

  // 1. Build Breadboard
  if (showBreadboard) {
    createBreadboard3D(breadboardMeshGroup);
  }

  // 2. Build Selected MCU (ESP32)
  createMcu3D(mcuMeshGroup, currentMcuId);

  // 3. Build Attached Modules
  createAttachedModules3D(modulesMeshGroup);

  // 4. Build 3D Jumpers / Wires
  if (showWires) {
    createWires3D(wiresMeshGroup);
  }

  // 5. If Tutorial Mode is Active, add pulsing pin highlights
  if (tutorialState.active) {
    createTutorialHighlights(tutorialHighlightGroup);
  }

  scene.add(breadboardMeshGroup);
  scene.add(mcuMeshGroup);
  scene.add(modulesMeshGroup);
  scene.add(wiresMeshGroup);
  scene.add(tutorialHighlightGroup);
}

// Procedural Realistic Breadboard Model
function createBreadboard3D(group) {
  const bbWidth = 24;
  const bbHeight = 1.3;
  const bbDepth = 8.5;

  // Breadboard body (off-white ABS plastic)
  const bodyGeo = new THREE.BoxGeometry(bbWidth, bbHeight, bbDepth);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.55,
    metalness: 0.05
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.position.set(0, bbHeight / 2, 0);
  bodyMesh.receiveShadow = true;
  bodyMesh.castShadow = true;
  group.add(bodyMesh);

  // Center trough (notch separating rows)
  const notchGeo = new THREE.BoxGeometry(bbWidth - 0.6, 0.45, 0.9);
  const notchMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
  const notchMesh = new THREE.Mesh(notchGeo, notchMat);
  notchMesh.position.set(0, bbHeight, 0);
  group.add(notchMesh);

  // Power rails (red & blue stripes)
  const lineGeo = new THREE.BoxGeometry(bbWidth - 1, 0.02, 0.15);
  const redMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const blueMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });

  // Top rails (+) and (-)
  const topRed = new THREE.Mesh(lineGeo, redMat);
  topRed.position.set(0, bbHeight + 0.01, 3.6);
  group.add(topRed);
  const topBlue = new THREE.Mesh(lineGeo, blueMat);
  topBlue.position.set(0, bbHeight + 0.01, 3.2);
  group.add(topBlue);

  // Bottom rails (+) and (-)
  const botBlue = new THREE.Mesh(lineGeo, blueMat);
  botBlue.position.set(0, bbHeight + 0.01, -3.2);
  group.add(botBlue);
  const botRed = new THREE.Mesh(lineGeo, redMat);
  botRed.position.set(0, bbHeight + 0.01, -3.6);
  group.add(botRed);
}

// Procedural Ultra-Realistic ESP32 NodeMCU 3D Model
function createMcu3D(group, mcuId) {
  const mcu = MCUS[mcuId];
  const pcbLength = 8.0;
  const pcbWidth = 3.8;
  const pcbThickness = 0.24;

  // PCB Board Texture
  const pcbTexture = generateEsp32SilkscreenTexture(mcu);
  const pcbMat = new THREE.MeshStandardMaterial({
    map: pcbTexture,
    roughness: 0.35,
    metalness: 0.2
  });

  const pcbGeo = new THREE.BoxGeometry(pcbLength, pcbThickness, pcbWidth);
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
  pcbMesh.position.set(-3.5, 1.9, 0);
  pcbMesh.castShadow = true;
  pcbMesh.receiveShadow = true;
  group.add(pcbMesh);

  // Metal Shield (ESP-WROOM-32) with Laser Engraved Details
  const shieldTex = generateShieldLaserTexture();
  const shieldGeo = new THREE.BoxGeometry(2.8, 0.42, 2.5);
  const shieldMat = new THREE.MeshStandardMaterial({
    map: shieldTex,
    metalness: 0.92,
    roughness: 0.22
  });
  const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
  shieldMesh.position.set(-2.8, 2.15, 0);
  shieldMesh.castShadow = true;
  group.add(shieldMesh);

  // Micro USB Connector (Silver Sheet Metal)
  const usbGeo = new THREE.BoxGeometry(1.0, 0.45, 1.1);
  const usbMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95, roughness: 0.1 });
  const usbMesh = new THREE.Mesh(usbGeo, usbMat);
  usbMesh.position.set(-7.1, 2.05, 0);
  group.add(usbMesh);

  // USB Inner Plastic Tongue
  const usbTongue = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.15, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x0f172a })
  );
  usbTongue.position.set(-7.3, 2.05, 0);
  group.add(usbTongue);

  // AMS1117 3.3V Voltage Regulator Chip (SOT-223)
  const regBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.3, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3 })
  );
  regBody.position.set(-4.5, 2.1, -1.0);
  group.add(regBody);

  // CP2102 USB-to-UART Bridge Controller (QFN square chip)
  const cp2102 = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.2, 0.7),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.25 })
  );
  cp2102.position.set(-5.5, 2.05, 0);
  group.add(cp2102);

  // Tactile Micro Push Buttons (EN and BOOT)
  const btnHousingMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
  const btnMetalMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.15 });

  [-1.2, 1.2].forEach(zPos => {
    const btnBase = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.25, 0.45), btnHousingMat);
    btnBase.position.set(-6.3, 2.1, zPos);
    group.add(btnBase);
    const btnCap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.15, 12), btnMetalMat);
    btnCap.position.set(-6.3, 2.25, zPos);
    group.add(btnCap);
  });

  // Power LED (Red)
  const pwrLedMat = new THREE.MeshStandardMaterial({
    color: virtualPower ? 0xef4444 : 0x450a0a,
    emissive: virtualPower ? 0xef4444 : 0x000000,
    emissiveIntensity: virtualPower ? 2.2 : 0
  });
  const pwrLed = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.15, 0.22), pwrLedMat);
  pwrLed.position.set(-5.3, 2.1, -1.0);
  group.add(pwrLed);

  // GPIO 2 Onboard LED (Blue)
  const gpio2LedMat = new THREE.MeshStandardMaterial({
    color: (virtualPower && virtualLedState) ? 0x06b6d4 : 0x082f49,
    emissive: (virtualPower && virtualLedState) ? 0x06b6d4 : 0x000000,
    emissiveIntensity: (virtualPower && virtualLedState) ? 2.5 : 0
  });
  const gpio2Led = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.15, 0.22), gpio2LedMat);
  gpio2Led.position.set(-5.3, 2.1, 1.0);
  group.add(gpio2Led);

  // Golden Pin Headers with Black DuPont Collar Bases
  const pinsPerRow = Math.floor(mcu.pinsCount / 2);
  const pinSpacing = 6.8 / (pinsPerRow - 1);
  const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.85, 8);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.15 });
  const collarGeo = new THREE.BoxGeometry(0.3, 0.4, 0.3);
  const collarMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });

  // Left pin row
  for (let i = 0; i < pinsPerRow; i++) {
    const xPos = -6.7 + (i * pinSpacing);
    const zPos = -1.65;

    // Collar
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.position.set(xPos, 1.7, zPos);
    group.add(collar);

    // Pin
    const pin = new THREE.Mesh(pinGeo, pinMat.clone());
    pin.position.set(xPos, 1.9, zPos);
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

  // Right pin row
  for (let i = 0; i < pinsPerRow; i++) {
    const xPos = -6.7 + (i * pinSpacing);
    const zPos = 1.65;

    // Collar
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.position.set(xPos, 1.7, zPos);
    group.add(collar);

    // Pin
    const pin = new THREE.Mesh(pinGeo, pinMat.clone());
    pin.position.set(xPos, 1.9, zPos);
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
  let offsetX = 3.8;

  attachedModules.forEach((modId) => {
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
    } else if (modId === 'sg90_servo') {
      createServo3D(modGroup);
    } else {
      createGenericModule3D(modGroup, modId);
    }

    group.add(modGroup);
    offsetX += 4.8;
  });
}

function createRelay3D(group) {
  // PCB Blue Base
  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 0.22, 2.8),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 })
  );
  pcb.position.y = 0.11;
  pcb.castShadow = true;
  group.add(pcb);

  // Relay Blue Cube (Songle SRD)
  const cubeMat = new THREE.MeshStandardMaterial({
    color: virtualRelayState ? 0x2563eb : 0x1e40af,
    roughness: 0.35
  });
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.6, 1.9), cubeMat);
  cube.position.set(-0.4, 0.95, 0);
  cube.castShadow = true;
  group.add(cube);

  // Terminal block (green screw terminals)
  const term = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 1.0, 2.3),
    new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 })
  );
  term.position.set(1.2, 0.65, 0);
  group.add(term);

  // Relay Status LED
  const rLedMat = new THREE.MeshStandardMaterial({
    color: virtualRelayState ? 0x22c55e : 0x052e16,
    emissive: virtualRelayState ? 0x22c55e : 0x000000,
    emissiveIntensity: virtualRelayState ? 2.4 : 0
  });
  const rLed = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.15, 0.22), rLedMat);
  rLed.position.set(-0.8, 0.32, -1.0);
  group.add(rLed);

  // Header Pins with DuPont base
  const pins = ['VCC', 'GND', 'IN'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.65, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 })
    );
    pin.position.set(-1.3, 0.45, -0.6 + (i * 0.6));
    pin.userData = { isPin: true, modulePin: true, module: 'rele_1ch', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createDht223D(group) {
  // White slotted housing
  const caseGeo = new THREE.BoxGeometry(2.1, 2.5, 1.5);
  const caseMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45 });
  const caseMesh = new THREE.Mesh(caseGeo, caseMat);
  caseMesh.position.y = 1.35;
  caseMesh.castShadow = true;
  group.add(caseMesh);

  // Pins
  const pins = ['VCC', 'DATA', 'NC', 'GND'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.7, 8),
      new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9 })
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
    new THREE.BoxGeometry(2.9, 0.22, 2.9),
    new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.35 })
  );
  pcb.position.y = 0.11;
  pcb.castShadow = true;
  group.add(pcb);

  // Glass Screen with Dynamic Canvas Texture
  const screenGeo = new THREE.BoxGeometry(2.5, 0.1, 1.9);
  const screenMat = new THREE.MeshBasicMaterial({ map: oledTexture });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.28, 0.3);
  group.add(screen);

  // 4 Pins on top (GND, VCC, SCL, SDA)
  const pins = ['GND', 'VCC', 'SCL', 'SDA'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 })
    );
    pin.position.set(-0.75 + (i * 0.5), 0.4, -1.15);
    pin.userData = { isPin: true, modulePin: true, module: 'oled_i2c', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createUltrasonic3D(group) {
  // PCB Blue Base
  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.22, 2.4),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8 })
  );
  pcb.position.y = 0.11;
  pcb.castShadow = true;
  group.add(pcb);

  // Two metallic cylinders (Transducer T and R)
  const cylGeo = new THREE.CylinderGeometry(0.75, 0.75, 1.3, 20);
  const cylMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });

  const cyl1 = new THREE.Mesh(cylGeo, cylMat);
  cyl1.rotation.x = Math.PI / 2;
  cyl1.position.set(-1.15, 0.9, 0.3);
  cyl1.castShadow = true;
  group.add(cyl1);

  const cyl2 = new THREE.Mesh(cylGeo, cylMat);
  cyl2.rotation.x = Math.PI / 2;
  cyl2.position.set(1.15, 0.9, 0.3);
  cyl2.castShadow = true;
  group.add(cyl2);

  // Pins
  const pins = ['VCC', 'TRIG', 'ECHO', 'GND'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 })
    );
    pin.position.set(-0.75 + (i * 0.5), 0.4, -0.9);
    pin.userData = { isPin: true, modulePin: true, module: 'hc_sr04', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createPir3D(group) {
  // PCB Green Base
  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.22, 2.5),
    new THREE.MeshStandardMaterial({ color: 0x15803d })
  );
  pcb.position.y = 0.11;
  group.add(pcb);

  // Fresnel white hemisphere dome
  const domeGeo = new THREE.SphereGeometry(1.05, 18, 18, 0, Math.PI * 2, 0, Math.PI / 2);
  const domeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7, opacity: 0.95, transparent: true });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.set(0, 0.25, 0);
  dome.castShadow = true;
  group.add(dome);

  // Pins
  const pins = ['VCC', 'OUT', 'GND'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 })
    );
    pin.position.set(-0.6 + (i * 0.6), 0.4, 1.05);
    pin.userData = { isPin: true, modulePin: true, module: 'pir_motion', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createServo3D(group) {
  // Translucent blue plastic casing
  const bodyGeo = new THREE.BoxGeometry(2.3, 2.2, 1.2);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.9, roughness: 0.3 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(0, 1.1, 0);
  body.castShadow = true;
  group.add(body);

  // White horn / arm
  const hornGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
  const hornMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const horn = new THREE.Mesh(hornGeo, hornMat);
  horn.position.set(0.6, 2.3, 0);
  group.add(horn);

  // Pins
  const pins = ['VCC', 'GND', 'PWM'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8 })
    );
    pin.position.set(-0.8, 0.3, -0.4 + (i * 0.4));
    pin.userData = { isPin: true, modulePin: true, module: 'sg90_servo', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createGenericModule3D(group, modId) {
  const mod = moduleDatabase.find(m => m.id === modId);
  const colorHex = mod ? parseInt(mod.color.replace('#', '0x')) : 0x06b6d4;

  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(2.7, 0.22, 2.7),
    new THREE.MeshStandardMaterial({ color: colorHex })
  );
  pcb.position.y = 0.11;
  pcb.castShadow = true;
  group.add(pcb);

  const ic = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.3, 1.1),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 })
  );
  ic.position.set(0, 0.26, 0);
  group.add(ic);

  if (mod && mod.pins) {
    mod.pins.forEach((pName, i) => {
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 })
      );
      pin.position.set(-0.8 + (i * 0.5), 0.4, -1.05);
      pin.userData = { isPin: true, modulePin: true, module: modId, name: pName };
      group.add(pin);
      interactivePins.push(pin);
    });
  }
}

// 3D Realistic Curved Jumpers with DuPont Terminals
function createWires3D(group) {
  if (attachedModules.length === 0) return;

  let modXOffset = 3.8;

  attachedModules.forEach(modId => {
    const mod = moduleDatabase.find(m => m.id === modId);
    if (!mod || !mod.defaultEspPins) {
      modXOffset += 4.8;
      return;
    }

    // In tutorial mode, only show wires up to the current active step!
    let maxWireIndex = 999;
    if (tutorialState.active && tutorialState.moduleId === modId) {
      maxWireIndex = tutorialState.currentStep - 1; // Step 0 is placement
    }

    Object.entries(mod.defaultEspPins).forEach(([modPin, espPin], pinIndex) => {
      if (tutorialState.active && tutorialState.moduleId === modId && pinIndex > maxWireIndex) {
        return; // Don't show wire yet!
      }

      // Start & End positions
      const startX = -3.5 + (pinIndex * 0.45);
      const startY = 2.2;
      const startZ = espPin.includes('VIN') || espPin.includes('3V3') || espPin.includes('GND') ? 1.65 : -1.65;

      const endX = modXOffset - 1.2 + (pinIndex * 0.55);
      const endY = 2.1;
      const endZ = 0.0;

      // Realistic DuPont Terminals (Black plastic sleeves at both ends)
      const dupontGeo = new THREE.BoxGeometry(0.24, 0.55, 0.24);
      const dupontMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });

      const d1 = new THREE.Mesh(dupontGeo, dupontMat);
      d1.position.set(startX, startY + 0.1, startZ);
      group.add(d1);

      const d2 = new THREE.Mesh(dupontGeo, dupontMat);
      d2.position.set(endX, endY + 0.1, endZ);
      group.add(d2);

      // Catenary sag / Bézier curve for flexible insulated wire
      const midX = (startX + endX) / 2;
      const midY = Math.max(startY, endY) + 2.8 + (pinIndex * 0.45);
      const midZ = (startZ + endZ) / 2 + 1.2;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startX, startY + 0.4, startZ),
        new THREE.Vector3(startX, startY + 1.1, startZ),
        new THREE.Vector3(midX, midY, midZ),
        new THREE.Vector3(endX, endY + 1.1, endZ),
        new THREE.Vector3(endX, endY + 0.4, endZ)
      ]);

      const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.08, 10, false);
      const wireColorHex = mod.wireColors && mod.wireColors[modPin] ? parseInt(mod.wireColors[modPin].replace('#', '0x')) : 0xeab308;
      const tubeMat = new THREE.MeshStandardMaterial({
        color: wireColorHex,
        roughness: 0.25,
        metalness: 0.08
      });

      const wireMesh = new THREE.Mesh(tubeGeo, tubeMat);
      wireMesh.castShadow = true;
      group.add(wireMesh);
    });

    modXOffset += 4.8;
  });
}

// Visual Glowing Holographic Highlights during Tutorial Steps
function createTutorialHighlights(group) {
  if (!tutorialState.active) return;
  const step = tutorialState.steps[tutorialState.currentStep];
  if (!step) return;

  if (tutorialState.currentStep === 0) {
    // Step 0: Highlight placement zone with an amber pulsating ring
    const ringGeo = new THREE.RingGeometry(1.6, 2.0, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(3.8, 1.85, 0);
    group.add(ring);
  } else {
    // Highlight active source and destination pins with glowing spheres
    const highlightGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const highlightMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true
    });

    // ESP Pin
    const p1 = new THREE.Mesh(highlightGeo, highlightMat);
    p1.position.set(-3.5, 2.8, step.destPin.includes('VCC') || step.destPin.includes('5V') || step.destPin.includes('GND') ? 1.65 : -1.65);
    group.add(p1);

    // Module Pin
    const p2 = new THREE.Mesh(highlightGeo, highlightMat);
    p2.position.set(2.8, 2.8, 0);
    group.add(p2);
  }
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
  if (pinName.includes('3V3')) return 'Alimentação Regulada de 3.3V (AMS1117)';
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
    <div class="p-3.5 bg-cyan-950/30 border border-cyan-500/40 rounded-xl space-y-2">
      <div class="text-xs font-bold text-cyan-300 flex items-center justify-between">
        <span>${pinName}</span>
        <span class="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Inspecionado</span>
      </div>
      <p class="text-slate-300 text-[11px] leading-relaxed">${desc}</p>
      <div class="text-[10px] text-slate-400 pt-1.5 border-t border-slate-800 flex items-center justify-between">
        <span>Tensão Segura:</span>
        <span class="text-white font-bold">${pinName.includes('5V') || pinName.includes('VIN') ? '5.0V' : '3.3V (Não use 5V)'}</span>
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
      let wireName = getWireColorName(wireHex);

      let signalType = 'Digital GPIO';
      if (modPin.includes('VCC') || modPin.includes('5V') || modPin.includes('3V3')) signalType = 'Alimentação (+)';
      else if (modPin.includes('GND')) signalType = 'Terra / Ground (-)';
      else if (modPin.includes('SCL') || modPin.includes('SDA')) signalType = 'Barramento I2C';
      else if (modPin.includes('PWM')) signalType = 'Controle PWM';

      rowsHtml += `
        <tr class="hover:bg-slate-900/60 transition">
          <td class="py-3 px-3">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold border border-slate-700" style="background-color: ${wireHex}25; color: ${wireHex === '#0f172a' ? '#94a3b8' : wireHex}">
              <span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color: ${wireHex}"></span>
              ${wireName}
            </span>
          </td>
          <td class="py-3 px-3 font-semibold text-slate-200">${mod.name}</td>
          <td class="py-3 px-3 text-amber-300 font-bold">${modPin}</td>
          <td class="py-3 px-3 text-emerald-400 font-bold">${espPin}</td>
          <td class="py-3 px-3 text-slate-400">${signalType}</td>
          <td class="py-3 px-3 text-right">
            <button onclick="startTeachingModule('${mod.id}')" class="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 rounded-lg text-[10px] font-bold border border-amber-500/40 transition">
              <i class="fa-solid fa-graduation-cap"></i> Ensinar
            </button>
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
    btn.className = 'px-3.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition';
    badge.textContent = 'LIGADO (5V USB)';
    badge.className = 'text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 animate-pulse font-semibold';
  } else {
    btn.textContent = 'LIGAR';
    btn.className = 'px-3.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition';
    badge.textContent = 'Desligado';
    badge.className = 'text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700';
  }

  rebuild3dScene();
  updateVirtualControls();
  showToast(virtualPower ? 'ESP32 Alimentado! LEDs ativos na placa.' : 'Alimentação desligada.');
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
  showToast(virtualRelayState ? 'Relé ATIVADO (Click mecânico - Contato Fechado)' : 'Relé DESATIVADO (Contato Aberto)');
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
      <div class="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-semibold text-slate-300">Módulo Relé (GPIO 23)</span>
          <button onclick="toggleVirtualRelay()" class="px-2.5 py-1 ${virtualRelayState ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'} rounded-lg text-xs font-bold transition">
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
      <div class="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
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
      <div class="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
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
          <button onclick="startTeachingModule('${mod.id}')" class="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5">
            <i class="fa-solid fa-graduation-cap"></i> Me Ensinar
          </button>
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
    version: '2.0',
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
