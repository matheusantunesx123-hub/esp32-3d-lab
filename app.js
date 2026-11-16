// ESP32 & Módulos 3D Lab v3.0 - Ultra-Fiel 1:1, Memória Persistente & Multi-Painel

// --- Microcontroller Definitions & Precise Physical Pin Maps ---
const MCUS = {
  esp32_wroom_30: {
    id: 'esp32_wroom_30',
    name: 'ESP32 DevKit V1 (30 Pinos)',
    pinsCount: 30,
    logicVoltage: '3.3V',
    leftPins: ['EN', 'VP', 'VN', 'D34', 'D35', 'D32', 'D33', 'D25', 'D26', 'D27', 'D14', 'D12', 'D13', 'GND', 'VIN'],
    rightPins: ['D23', 'D22', 'TX0', 'RX0', 'D21', 'D19', 'D18', 'D5', 'TX2', 'RX2', 'D4', 'D2', 'D15', 'GND', '3V3']
  },
  esp32_wroom_38: {
    id: 'esp32_wroom_38',
    name: 'ESP32 DevKit V1 (38 Pinos)',
    pinsCount: 38,
    logicVoltage: '3.3V',
    leftPins: ['3V3', 'EN', 'VP', 'VN', 'D34', 'D35', 'D32', 'D33', 'D25', 'D26', 'D27', 'D14', 'D12', 'GND', 'D13', 'D9', 'D10', 'D11', 'VIN'],
    rightPins: ['GND', 'D23', 'D22', 'TX0', 'RX0', 'D21', 'D19', 'D18', 'D5', 'TX2', 'RX2', 'D4', 'D2', 'D15', 'D8', 'D7', 'D6', 'CLK', 'CMD']
  },
  esp8266_nodemcu: {
    id: 'esp8266_nodemcu',
    name: 'ESP8266 NodeMCU V3 (ESP-12E)',
    pinsCount: 30,
    logicVoltage: '3.3V',
    leftPins: ['A0', 'RSV', 'RSV', 'SD3', 'SD2', 'SD1', 'CMD', 'SD0', 'CLK', 'GND', '3V3', 'EN', 'RST', 'GND', 'VIN'],
    rightPins: ['D0', 'D1', 'D2', 'D3', 'D4', '3V3', 'GND', 'D5', 'D6', 'D7', 'D8', 'RX', 'TX', 'GND', '3V3']
  },
  esp8266_d1mini: {
    id: 'esp8266_d1mini',
    name: 'ESP8266 D1 Mini',
    pinsCount: 16,
    logicVoltage: '3.3V',
    leftPins: ['RST', 'A0', 'D0', 'D5', 'D6', 'D7', 'D8', '3V3'],
    rightPins: ['TX', 'RX', 'D1', 'D2', 'D3', 'D4', 'GND', '5V']
  },
  arduino_uno: {
    id: 'arduino_uno',
    name: 'Arduino Uno R3 (Nó Central de Sensores)',
    pinsCount: 28,
    logicVoltage: '5V',
    leftPins: ['IOREF', 'RESET', '3.3V', '5V', 'GND', 'GND', 'VIN', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'NC'],
    rightPins: ['D0/RX', 'D1/TX', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13']
  },
  esp8266_esp01: {
    id: 'esp8266_esp01',
    name: 'ESP8266 ESP-01 / ESP-01S (8 Pinos Wi-Fi)',
    pinsCount: 8,
    logicVoltage: '3.3V',
    leftPins: ['GND', 'GPIO2', 'GPIO0', 'RX'],
    rightPins: ['TX', 'CH_PD', 'RST', 'VCC']
  }
};

// --- Presets dos Projetos Separados do Ecossistema Snake ---
const PROJECT_PRESETS = {
  projeto1_central_esp32: {
    id: 'projeto1_central_esp32',
    name: 'Projeto 1: Central ESP32 RF 433MHz',
    mcuId: 'esp32_wroom_30',
    modules: ['rele_1ch', 'oled_i2c', 'rf433_tx'],
    desc: 'Central ESP32 com Display OLED, Relé e Transmissor RF 433MHz (Alexa & Spotify).',
    wokwiUrl: 'https://wokwi.com/projects/new/esp32'
  },
  projeto2_arduino_esp01: {
    id: 'projeto2_arduino_esp01',
    name: 'Projeto 2: Nó Sensor Arduino Uno + ESP-01',
    mcuId: 'arduino_uno',
    modules: ['esp01_modem', 'dht22', 'pir_hc_sr501'],
    desc: 'Arduino Uno como nó hub de sensores lendo DHT22, PIR e Botão, usando ESP-01 (8 pinos) exclusivamente como modem Wi-Fi.',
    wokwiUrl: 'https://wokwi.com/projects/new/arduino-uno'
  },
  custom: {
    id: 'custom',
    name: 'Bancada Livre / Customizada',
    mcuId: 'esp32_wroom_30',
    modules: ['rele_1ch'],
    desc: 'Monte seus próprios circuitos combinando microcontroladores e módulos livremente.',
    wokwiUrl: 'https://wokwi.com/projects/new/esp32'
  }
};

// --- Module Database with Exact Pin Matchings & Step-by-Step Educational Guides ---
const DEFAULT_MODULE_DATABASE = [
  {
    id: 'rele_1ch',
    name: 'Módulo Relé (1 Canal)',
    category: 'atuador',
    voltage: '5V / 3.3V',
    color: '#3b82f6',
    icon: 'fa-toggle-on',
    pins: ['VCC', 'GND', 'IN'],
    defaultEspPins: { 'VCC': 'VIN', 'GND': 'GND', 'IN': 'D23' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'IN': '#eab308' },
    desc: 'Permite acionar lâmpadas e cargas AC/DC com isolamento óptico.',
    tutorialSteps: [
      {
        title: 'Posicionamento Mecânico',
        wireName: 'Encaixe na Bancada',
        wireColor: '#3b82f6',
        sourcePin: 'Bancada',
        destPin: 'Ao lado do ESP32',
        wireType: 'Fixação Física',
        explanation: 'Posicione o módulo relé deixando cerca de 5cm de folga do ESP32. Isso evita interferência eletromagnética gerada quando a bobina comuta cargas altas.'
      },
      {
        title: 'Alimentação Positiva (VCC)',
        wireName: 'Fio Vermelho (VCC)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: Pino VIN (5V)',
        destPin: 'Relé: Pino VCC',
        wireType: 'Macho-Fêmea',
        explanation: 'O relé precisa de 5V na bobina. Conecte o fio vermelho do pino VIN do ESP32 (último pino da esquerda) ao pino VCC do relé.'
      },
      {
        title: 'Aterramento Comum (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'ESP32: Pino GND',
        destPin: 'Relé: Pino GND',
        wireType: 'Macho-Fêmea',
        explanation: 'Conecte o fio preto do pino GND do ESP32 (ao lado do VIN) ao pino GND do relé para fechar a referência de terra de 0V.'
      },
      {
        title: 'Controle Digital de Acionamento (IN)',
        wireName: 'Fio Amarelo (Sinal)',
        wireColor: '#eab308',
        sourcePin: 'ESP32: Pino D23 (GPIO 23)',
        destPin: 'Relé: Pino IN',
        wireType: 'Macho-Fêmea',
        explanation: 'Conecte o fio amarelo do pino D23 (primeiro pino da direita) ao pino IN do relé. Ao enviar digitalWrite(23, HIGH) no código, o relé liga!'
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
    defaultEspPins: { 'VCC': '3V3', 'GND': 'GND', 'DATA': 'D4' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'DATA': '#06b6d4' },
    desc: 'Mede temperatura (-40 a 80°C) e umidade com protocolo digital de 1 via.',
    tutorialSteps: [
      {
        title: 'Posicionamento do Sensor',
        wireName: 'Encaixe na Protoboard',
        wireColor: '#10b981',
        sourcePin: 'Protoboard',
        destPin: 'Ranhuras Frontais',
        wireType: 'Encaixe 4 Pinos',
        explanation: 'Encaixe o sensor DHT22 na protoboard com a grade de ventilação branca virada para frente.'
      },
      {
        title: 'Alimentação 3.3V (VCC)',
        wireName: 'Fio Vermelho (3.3V)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: Pino 3V3',
        destPin: 'DHT22: Pino 1 (VCC)',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o fio vermelho do pino 3V3 do ESP32 (último pino da direita) ao Pino 1 (VCC) do sensor.'
      },
      {
        title: 'Aterramento (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'ESP32: Pino GND',
        destPin: 'DHT22: Pino 4 (GND)',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o fio preto do pino GND do ESP32 ao Pino 4 (GND) do sensor.'
      },
      {
        title: 'Linha Digital de Dados (DATA)',
        wireName: 'Fio Azul Claro (DATA)',
        wireColor: '#06b6d4',
        sourcePin: 'ESP32: Pino D4 (GPIO 4)',
        destPin: 'DHT22: Pino 2 (DATA)',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o fio azul do pino D4 do ESP32 ao Pino 2 (DATA) do sensor.'
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
    pins: ['GND', 'VCC', 'SCL', 'SDA'],
    defaultEspPins: { 'VCC': '3V3', 'GND': 'GND', 'SCL': 'D22', 'SDA': 'D21' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'SCL': '#a855f7', 'SDA': '#3b82f6' },
    desc: 'Tela gráfica monocromática 128x64 com comunicação I2C.',
    tutorialSteps: [
      {
        title: 'Posicionamento do Display',
        wireName: 'Encaixe na Protoboard',
        wireColor: '#06b6d4',
        sourcePin: 'Protoboard',
        destPin: 'Área Visível',
        wireType: 'Barra 4 Pinos',
        explanation: 'Posicione o display OLED com a tela de vidro virada para cima para facilitar a leitura durante os testes.'
      },
      {
        title: 'Alimentação 3.3V (VCC)',
        wireName: 'Fio Vermelho (3.3V)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: Pino 3V3',
        destPin: 'OLED: Pino VCC',
        wireType: 'Macho-Macho',
        explanation: 'Conecte o fio vermelho do pino 3V3 do ESP ao VCC do OLED.'
      },
      {
        title: 'Aterramento (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'ESP32: Pino GND',
        destPin: 'OLED: Pino GND',
        wireType: 'Macho-Macho',
        explanation: 'Conecte o fio preto do GND do ESP ao GND do OLED.'
      },
      {
        title: 'I2C Clock de Comunicação (SCL)',
        wireName: 'Fio Roxo (SCL)',
        wireColor: '#a855f7',
        sourcePin: 'ESP32: Pino D22',
        destPin: 'OLED: Pino SCL',
        wireType: 'Macho-Macho',
        explanation: 'O pino D22 é o SCL (Clock I2C nativo do ESP32). Ligue ao pino SCL do OLED.'
      },
      {
        title: 'I2C Linha de Dados (SDA)',
        wireName: 'Fio Azul (SDA)',
        wireColor: '#3b82f6',
        sourcePin: 'ESP32: Pino D21',
        destPin: 'OLED: Pino SDA',
        wireType: 'Macho-Macho',
        explanation: 'O pino D21 é o SDA (Dados I2C nativo do ESP32). Ligue ao pino SDA do OLED.'
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
    defaultEspPins: { 'VCC': 'VIN', 'GND': 'GND', 'TRIG': 'D5', 'ECHO': 'D18' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'TRIG': '#10b981', 'ECHO': '#f59e0b' },
    desc: 'Mede distância de 2cm a 400cm com emissão e recepção de ondas sonoras.',
    tutorialSteps: [
      {
        title: 'Posicionamento Frontal',
        wireName: 'Encaixe Frontal',
        wireColor: '#8b5cf6',
        sourcePin: 'Protoboard',
        destPin: 'Área Livre',
        wireType: '4 Pinos',
        explanation: 'Deixe os dois cilindros de alumínio apontados para a frente sem barreiras próximas.'
      },
      {
        title: 'Alimentação 5V (VCC)',
        wireName: 'Fio Vermelho (5V)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: Pino VIN (5V)',
        destPin: 'HC-SR04: VCC',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o pino VIN do ESP32 ao VCC do HC-SR04.'
      },
      {
        title: 'Aterramento (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'ESP32: Pino GND',
        destPin: 'HC-SR04: GND',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o pino GND do ESP32 ao GND do sensor.'
      },
      {
        title: 'Disparo de Pulso (TRIG)',
        wireName: 'Fio Verde (TRIG)',
        wireColor: '#10b981',
        sourcePin: 'ESP32: Pino D5',
        destPin: 'HC-SR04: TRIG',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o pino D5 do ESP32 ao pino TRIG do sensor.'
      },
      {
        title: 'Retorno do Eco (ECHO)',
        wireName: 'Fio Laranja (ECHO)',
        wireColor: '#f59e0b',
        sourcePin: 'ESP32: Pino D18',
        destPin: 'HC-SR04: ECHO',
        wireType: 'Macho-Macho',
        explanation: 'Ligue o pino D18 do ESP32 ao pino ECHO do sensor.'
      }
    ]
  },
  {
    id: 'esp01_modem',
    name: 'Módulo ESP-01 / ESP-01S (8 Pinos Wi-Fi)',
    category: 'comunicacao',
    voltage: '3.3V',
    color: '#0284c7',
    icon: 'fa-wifi',
    pins: ['3V3', 'GND', 'TX', 'RX', 'CH_PD', 'RST', 'GPIO0', 'GPIO2'],
    defaultEspPins: { '3V3': '3.3V', 'GND': 'GND', 'TX': 'D10', 'RX': 'D11', 'CH_PD': '3.3V' },
    wireColors: { '3V3': '#ef4444', 'GND': '#0f172a', 'TX': '#10b981', 'RX': '#f59e0b', 'CH_PD': '#ef4444' },
    desc: 'Ponte Wi-Fi serial que roda comandos AT ou firmware bridge para dar conexão de rede ao Arduino Uno.',
    tutorialSteps: [
      {
        title: 'Posicionamento e Identificação dos 8 Pinos',
        wireName: 'Encaixe 2x4 Pinos',
        wireColor: '#0284c7',
        sourcePin: 'Protoboard',
        destPin: 'Área Dedicada',
        wireType: 'Barra 2x4',
        explanation: 'O ESP-01 possui 8 pinos em duas fileiras de 4: [GND, GPIO2, GPIO0, RX] e [TX, CH_PD, RST, VCC]. Atenção: NUNCA alimente com 5V direto!'
      },
      {
        title: 'Alimentação 3.3V e Habilitação (VCC + CH_PD)',
        wireName: 'Fio Vermelho Duplo (3.3V)',
        wireColor: '#ef4444',
        sourcePin: 'Arduino / Fonte: Pino 3.3V',
        destPin: 'ESP-01: Pinos VCC e CH_PD',
        wireType: 'Macho-Fêmea',
        explanation: 'O chip ESP8266 só inicializa se o pino CH_PD (Chip Enable) estiver em nível alto (3.3V) junto com o VCC. Ligue ambos no 3.3V.'
      },
      {
        title: 'Aterramento Comum (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'Arduino: Pino GND',
        destPin: 'ESP-01: Pino GND',
        wireType: 'Macho-Fêmea',
        explanation: 'Conecte o pino GND do Arduino ao GND do ESP-01 para compartilhar a referência de 0V.'
      },
      {
        title: 'Recepção de Dados (TX do ESP -> D10 do Arduino)',
        wireName: 'Fio Verde (TX -> RX Arduino)',
        wireColor: '#10b981',
        sourcePin: 'ESP-01: Pino TX (3.3V)',
        destPin: 'Arduino: Pino D10 (SoftwareSerial RX)',
        wireType: 'Direto Macho-Fêmea',
        explanation: 'O pino TX do ESP solta nível lógico de 3.3V, que é perfeitamente reconhecido como nível ALTO pelo pino digital D10 do Arduino sem perigo.'
      },
      {
        title: 'Envio Seguro com Divisor de Tensão (D11 do Arduino -> RX do ESP)',
        wireName: 'Fio Laranja com Resistor 1kΩ + 2kΩ',
        wireColor: '#f59e0b',
        sourcePin: 'Arduino: Pino D11 (SoftwareSerial TX)',
        destPin: 'ESP-01: Pino RX (via Divisor 1k/2k)',
        wireType: 'Com Divisor Resistivo',
        explanation: 'O Arduino envia 5V no pino D11. Para não queimar a entrada RX do ESP-01 (que suporta até 3.6V), use um resistor de 1kΩ em série com a linha e 2kΩ ligando ao GND (reduz de 5V para 3.3V).'
      }
    ]
  },
  {
    id: 'rf433_tx',
    name: 'Transmissor RF 433MHz (SYN115 / FS1000A)',
    category: 'comunicacao',
    voltage: '5V / 3.3V',
    color: '#eab308',
    icon: 'fa-tower-broadcast',
    pins: ['VCC', 'DATA', 'GND'],
    defaultEspPins: { 'VCC': 'VIN', 'GND': 'GND', 'DATA': 'D4' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'DATA': '#eab308' },
    desc: 'Emite sinais de rádio frequência 433.92MHz com codificação EV1527 para acionar tomadas, relés sem fio e fitas de LED.',
    tutorialSteps: [
      {
        title: 'Alimentação do Módulo RF',
        wireName: 'Fio Vermelho (5V)',
        wireColor: '#ef4444',
        sourcePin: 'ESP32: Pino VIN (5V)',
        destPin: 'RF TX: Pino VCC',
        wireType: 'Macho-Fêmea',
        explanation: 'Embora funcione em 3.3V, alimentar o transmissor RF com 5V (pino VIN) dobra o alcance de transmissão pelo ar.'
      },
      {
        title: 'Aterramento (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'ESP32: Pino GND',
        destPin: 'RF TX: Pino GND',
        wireType: 'Macho-Fêmea',
        explanation: 'Ligue o pino GND do ESP32 ao pino GND do módulo transmissor.'
      },
      {
        title: 'Linha de Dados Modulados (DATA)',
        wireName: 'Fio Amarelo (DATA)',
        wireColor: '#eab308',
        sourcePin: 'ESP32: Pino D4 (GPIO 4)',
        destPin: 'RF TX: Pino DATA / ATAD',
        wireType: 'Macho-Fêmea',
        explanation: 'Ligue o pino D4 do ESP32 ao pino de dados do transmissor. A biblioteca rc-switch modulará pulsos de 350µs no protocolo EV1527.'
      }
    ]
  },
  {
    id: 'pir_hc_sr501',
    name: 'Sensor de Presença PIR (HC-SR501)',
    category: 'sensor',
    voltage: '5V',
    color: '#84cc16',
    icon: 'fa-person-walking',
    pins: ['VCC', 'OUT', 'GND'],
    defaultEspPins: { 'VCC': '5V', 'GND': 'GND', 'OUT': 'D3' },
    wireColors: { 'VCC': '#ef4444', 'GND': '#0f172a', 'OUT': '#84cc16' },
    desc: 'Detecta movimento e presença humana por radiação infravermelha com cúpula de Fresnel.',
    tutorialSteps: [
      {
        title: 'Alimentação 5V',
        wireName: 'Fio Vermelho (5V)',
        wireColor: '#ef4444',
        sourcePin: 'Arduino: Pino 5V',
        destPin: 'PIR: Pino VCC',
        wireType: 'Macho-Fêmea',
        explanation: 'O sensor PIR requer 5V no pino VCC para alimentar seu regulador interno de 3.3V.'
      },
      {
        title: 'Aterramento (GND)',
        wireName: 'Fio Preto (GND)',
        wireColor: '#0f172a',
        sourcePin: 'Arduino: Pino GND',
        destPin: 'PIR: Pino GND',
        wireType: 'Macho-Fêmea',
        explanation: 'Ligue o pino GND do Arduino ao pino GND do sensor PIR.'
      },
      {
        title: 'Saída Digital de Movimento (OUT)',
        wireName: 'Fio Verde Claro (OUT)',
        wireColor: '#84cc16',
        sourcePin: 'PIR: Pino OUT',
        destPin: 'Arduino: Pino D3',
        wireType: 'Macho-Fêmea',
        explanation: 'O pino OUT solta nível HIGH (3.3V) sempre que detecta movimento. O Arduino lê normalmente na porta D3.'
      }
    ]
  }
];

// --- Persistent Application State ---
let currentProjectId = 'projeto1_central_esp32';
let currentMcuId = 'esp32_wroom_30';
let moduleDatabase = [];
let attachedModules = [];
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
let userProjectNotes = '';
let testHistoryLogs = [];

// Tutorial Mode State
let tutorialState = {
  active: false,
  moduleId: null,
  currentStep: 0,
  steps: []
};

// --- Three.js Globals ---
let scene, camera, renderer, controls;
let mcuMeshGroup, breadboardMeshGroup, modulesMeshGroup, wiresMeshGroup, tutorialHighlightGroup, pinLabelsGroup;
let raycaster, mouse;
let interactivePins = [];
let oledCanvas, oledTexture;
let cuttingMatTexture;

// Coordinates cache for exact physical pins
let espPhysicalPinCoords = {};
let modulePhysicalPinCoords = {};

// --- Initialization ---
window.addEventListener('DOMContentLoaded', () => {
  loadPersistentState();
  initThreeJs();
  renderCatalog();
  renderAttachedModules();
  updatePhysicalWiringGuide();
  generateFirmwareCode();
  renderDatabaseExplorer();
  updateVirtualControls();
  renderHistoryLogs();
  window.addEventListener('resize', onWindowResize);
});

// --- PERSISTENT MEMORY ENGINE (Saves Everything Automatically) ---
function savePersistentState() {
  const statePayload = {
    version: '3.0',
    timestamp: new Date().toISOString(),
    currentProjectId,
    currentMcuId,
    attachedModules,
    virtualPower,
    virtualLedState,
    virtualRelayState,
    virtualDhtTemp,
    virtualDhtHum,
    userProjectNotes,
    testHistoryLogs,
    customDatabase: moduleDatabase
  };

  try {
    localStorage.setItem('esp32_lab_state_v3', JSON.stringify(statePayload));
    indicateSaveStatus(true);
  } catch (e) {
    console.error('Error saving state to localStorage', e);
  }
}

function loadPersistentState() {
  try {
    const saved = localStorage.getItem('esp32_lab_state_v3');
    if (saved) {
      const data = JSON.parse(saved);
      currentProjectId = data.currentProjectId || 'projeto1_central_esp32';
      currentMcuId = data.currentMcuId || 'esp32_wroom_30';
      attachedModules = data.attachedModules || ['rele_1ch', 'oled_i2c', 'rf433_tx'];
      virtualPower = !!data.virtualPower;
      virtualLedState = !!data.virtualLedState;
      virtualRelayState = !!data.virtualRelayState;
      virtualDhtTemp = data.virtualDhtTemp !== undefined ? data.virtualDhtTemp : 24.5;
      virtualDhtHum = data.virtualDhtHum !== undefined ? data.virtualDhtHum : 58;
      userProjectNotes = data.userProjectNotes || '';
      testHistoryLogs = data.testHistoryLogs || [];
      moduleDatabase = data.customDatabase || [...DEFAULT_MODULE_DATABASE];

      const notesEl = document.getElementById('user-project-notes');
      if (notesEl) notesEl.value = userProjectNotes;
      const mcuSelect = document.getElementById('mcu-select');
      if (mcuSelect) mcuSelect.value = currentMcuId;
      const projSelect = document.getElementById('project-select');
      if (projSelect) projSelect.value = currentProjectId;
      const descEl = document.getElementById('project-desc-badge');
      if (descEl && PROJECT_PRESETS[currentProjectId]) {
        descEl.innerHTML = `<i class="fa-solid fa-circle-info text-cyan-400 mr-1"></i> ${PROJECT_PRESETS[currentProjectId].desc}`;
      }
      return;
    }
  } catch (e) {
    console.warn('Using default initial state');
  }

  // Fallback defaults
  moduleDatabase = [...DEFAULT_MODULE_DATABASE];
  attachedModules = ['rele_1ch', 'oled_i2c', 'rf433_tx'];
  testHistoryLogs = [
    { timestamp: new Date().toLocaleTimeString(), text: 'Sessão iniciada: Central ESP32 RF 433MHz.' }
  ];
}

function indicateSaveStatus(saved) {
  const indicator = document.getElementById('save-indicator');
  if (!indicator) return;
  if (saved) {
    indicator.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Memória Salva';
    indicator.className = 'flex items-center gap-1 text-emerald-400 font-medium';
  }
}

function logTestEvent(text) {
  const entry = {
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    text
  };
  testHistoryLogs.unshift(entry);
  if (testHistoryLogs.length > 50) testHistoryLogs.pop();
  renderHistoryLogs();
  savePersistentState();
}

function renderHistoryLogs() {
  const container = document.getElementById('history-log-list');
  if (!container) return;

  if (testHistoryLogs.length === 0) {
    container.innerHTML = '<div class="text-slate-500 text-xs text-center py-6">Nenhum evento registrado ainda.</div>';
    return;
  }

  container.innerHTML = testHistoryLogs.map(log => `
    <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
      <div class="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1">
        <span><i class="fa-solid fa-clock text-[9px] mr-1"></i> ${log.timestamp}</span>
        <span class="text-slate-600">Evento</span>
      </div>
      <div class="text-slate-300 leading-relaxed">${log.text}</div>
    </div>
  `).join('');
}

function toggleHistoryDrawer() {
  const drawer = document.getElementById('drawer-history');
  drawer.classList.toggle('translate-x-full');
}

function clearHistoryLog() {
  testHistoryLogs = [];
  renderHistoryLogs();
  savePersistentState();
  showToast('Histórico de testes limpo.');
}

function saveUserNotes(val) {
  userProjectNotes = val;
  savePersistentState();
}

// --- UNIFIED MULTI-PANEL VIEW SWITCHER ---
function switchView(viewName) {
  currentView = viewName;
  const panelArea = document.getElementById('panel-content-area');
  const subviews = ['wiring', 'test', 'wokwi', 'db'];
  const tabs = ['3d', 'wiring', 'test', 'wokwi', 'db'];

  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    if (btn) {
      if (t === viewName) {
        btn.className = "px-3 py-1.5 rounded-lg font-medium transition-all duration-200 bg-cyan-500 text-white shadow";
      } else {
        btn.className = "px-3 py-1.5 rounded-lg font-medium text-slate-400 hover:text-white transition-all duration-200";
      }
    }
  });

  if (viewName === '3d') {
    panelArea.classList.add('hidden');
  } else {
    panelArea.classList.remove('hidden');

    subviews.forEach(s => {
      const subEl = document.getElementById(`subview-${s}`);
      if (subEl) {
        if (s === viewName) {
          subEl.classList.remove('hidden');
        } else {
          subEl.classList.add('hidden');
        }
      }
    });

    if (viewName === 'wiring') {
      updatePhysicalWiringGuide();
    } else if (viewName === 'test') {
      generateFirmwareCode();
      updateVirtualControls();
    } else if (viewName === 'db') {
      renderDatabaseExplorer();
    }
  }

  savePersistentState();
  setTimeout(() => onWindowResize(), 60);
}

function toggleSplitMode() {
  if (currentView === '3d') {
    switchView('wiring');
  } else {
    switchView('3d');
  }
}

// --- Project Separation Management ---
function onProjectChange(projId) {
  currentProjectId = projId;
  const proj = PROJECT_PRESETS[projId];
  const descEl = document.getElementById('project-desc-badge');
  if (descEl && proj) {
    descEl.innerHTML = `<i class="fa-solid fa-circle-info text-cyan-400 mr-1"></i> ${proj.desc}`;
  }

  if (proj && projId !== 'custom') {
    currentMcuId = proj.mcuId;
    attachedModules = [...proj.modules];
    const mcuSelect = document.getElementById('mcu-select');
    if (mcuSelect) mcuSelect.value = currentMcuId;
    const mcu = MCUS[currentMcuId];
    if (mcu) {
      const hudEl = document.getElementById('hud-mcu-name');
      if (hudEl) hudEl.textContent = mcu.name;
      const badgeEl = document.getElementById('inspector-mcu-badge');
      if (badgeEl) badgeEl.textContent = `${mcu.pinsCount} Pinos`;
      const lvlEl = document.getElementById('mcu-level-badge');
      if (lvlEl) lvlEl.innerHTML = `<i class="fa-solid fa-bolt text-amber-400"></i> Nível: ${mcu.logicVoltage}`;
      const wifiEl = document.getElementById('mcu-wifi-badge');
      if (wifiEl) {
        wifiEl.innerHTML = currentMcuId === 'arduino_uno' 
          ? '<i class="fa-solid fa-microchip text-slate-400"></i> ATmega328P 5V' 
          : '<i class="fa-solid fa-wifi text-cyan-400"></i> 2.4GHz Wi-Fi';
      }
    }
    renderAttachedModules();
    rebuild3dScene();
    updatePhysicalWiringGuide();
    generateFirmwareCode();
    updateVirtualControls();
    renderCatalog();
    logTestEvent(`Projeto alternado para: ${proj.name}`);
    showToast(`Carregado: ${proj.name}`);
  }
  savePersistentState();
}

function loadWokwiProject(projType) {
  const iframe = document.getElementById('wokwi-iframe');
  const extBtn = document.getElementById('wokwi-external-btn');
  const btn1 = document.getElementById('wokwi-btn-proj1');
  const btn2 = document.getElementById('wokwi-btn-proj2');

  if (projType === 'esp32') {
    if (iframe) iframe.src = 'https://wokwi.com/projects/new/esp32';
    if (extBtn) extBtn.href = 'https://wokwi.com/projects/new/esp32';
    if (btn1) btn1.className = 'px-2.5 py-1 text-xs rounded-lg font-bold bg-cyan-600 text-white shadow transition';
    if (btn2) btn2.className = 'px-2.5 py-1 text-xs rounded-lg font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition';
    showToast('Simulador Wokwi: Central ESP32 carregado!');
  } else {
    if (iframe) iframe.src = 'https://wokwi.com/projects/new/arduino-uno';
    if (extBtn) extBtn.href = 'https://wokwi.com/projects/new/arduino-uno';
    if (btn2) btn2.className = 'px-2.5 py-1 text-xs rounded-lg font-bold bg-cyan-600 text-white shadow transition';
    if (btn1) btn1.className = 'px-2.5 py-1 text-xs rounded-lg font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition';
    showToast('Simulador Wokwi: Arduino Uno + ESP-01 carregado!');
  }
}

function copyProjectDiagramJson() {
  let diagramData = '';
  if (currentProjectId === 'projeto2_arduino_esp01') {
    diagramData = JSON.stringify({
      version: 1,
      author: "Matheus Snake Eco",
      editor: "wokwi",
      parts: [
        { type: "wokwi-arduino-uno", id: "uno", top: 0, left: 0, attrs: {} },
        { type: "board-esp-01s", id: "esp01", top: -140, left: 160, attrs: {} },
        { type: "wokwi-dht22", id: "dht", top: 120, left: 240, attrs: {} },
        { type: "wokwi-pir-motion-sensor", id: "pir", top: 120, left: 420, attrs: {} }
      ],
      connections: [
        [ "uno:5V", "dht:VCC", "red", [ "v0" ] ],
        [ "uno:GND.1", "dht:GND", "black", [ "v0" ] ],
        [ "uno:2", "dht:SDA", "blue", [ "v0" ] ],
        [ "uno:5V", "pir:VCC", "red", [ "v0" ] ],
        [ "uno:GND.1", "pir:GND", "black", [ "v0" ] ],
        [ "uno:3", "pir:OUT", "green", [ "v0" ] ],
        [ "uno:3.3V", "esp01:3V3", "red", [ "v0" ] ],
        [ "uno:3.3V", "esp01:EN", "red", [ "v0" ] ],
        [ "uno:GND.2", "esp01:GND", "black", [ "v0" ] ],
        [ "esp01:TX", "uno:10", "green", [ "v0" ] ],
        [ "uno:11", "esp01:RX", "orange", [ "v0" ] ]
      ]
    }, null, 2);
  } else {
    diagramData = JSON.stringify({
      version: 1,
      author: "Matheus Snake Eco",
      editor: "wokwi",
      parts: [
        { type: "board-esp32-devkit-c-v4", id: "esp", top: 0, left: 0, attrs: {} },
        { type: "board-ssd1306", id: "oled", top: -120, left: 80, attrs: { i2cAddress: "0x3c" } },
        { type: "wokwi-relay-module", id: "relay", top: 120, left: 180, attrs: {} }
      ],
      connections: [
        [ "esp:3V3", "oled:VCC", "red", [ "v0" ] ],
        [ "esp:GND.1", "oled:GND", "black", [ "v0" ] ],
        [ "esp:22", "oled:SCL", "purple", [ "v0" ] ],
        [ "esp:21", "oled:SDA", "blue", [ "v0" ] ],
        [ "esp:5V", "relay:VCC", "red", [ "v0" ] ],
        [ "esp:GND.2", "relay:GND", "black", [ "v0" ] ],
        [ "esp:15", "relay:IN", "yellow", [ "v0" ] ]
      ]
    }, null, 2);
  }
  navigator.clipboard.writeText(diagramData).then(() => {
    showToast('diagram.json copiado!');
  }).catch(() => {
    showToast('Copie o código do arquivo diagram.json.');
  });
}

function copyCurrentFirmwareCode() {
  const codeEl = document.getElementById('code-output');
  if (!codeEl) return;
  navigator.clipboard.writeText(codeEl.value).then(() => {
    showToast('sketch.ino copiado!');
  });
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
  logTestEvent(`Placa alterada para: ${mcu.name}`);
  savePersistentState();
  showToast(`Microcontrolador: ${mcu.name}`);
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
  renderCatalog();
  const mod = moduleDatabase.find(m => m.id === moduleId);
  logTestEvent(`Módulo adicionado à bancada: ${mod ? mod.name : moduleId}`);
  savePersistentState();
  showToast('Módulo adicionado à bancada!');
}

function detachModule(moduleId) {
  const mod = moduleDatabase.find(m => m.id === moduleId);
  attachedModules = attachedModules.filter(id => id !== moduleId);
  renderAttachedModules();
  rebuild3dScene();
  updatePhysicalWiringGuide();
  generateFirmwareCode();
  updateVirtualControls();
  renderCatalog();
  logTestEvent(`Módulo removido da bancada: ${mod ? mod.name : moduleId}`);
  savePersistentState();
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
  renderCatalog();
  logTestEvent('Todos os módulos foram removidos da bancada.');
  savePersistentState();
  showToast('Todos os módulos foram removidos.');
}

function renderAttachedModules() {
  const container = document.getElementById('attached-modules-list');
  const countEl = document.getElementById('attached-count');
  countEl.textContent = attachedModules.length;

  if (attachedModules.length === 0) {
    container.innerHTML = `
      <div class="text-[10px] text-slate-500 text-center py-3 border border-dashed border-slate-800 rounded-xl">
        Nenhum módulo na bancada.<br>Selecione um no catálogo abaixo.
      </div>
    `;
    return;
  }

  container.innerHTML = attachedModules.map(modId => {
    const mod = moduleDatabase.find(m => m.id === modId);
    if (!mod) return '';
    return `
      <div class="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white shadow" style="background-color: ${mod.color}">
            <i class="fa-solid ${mod.icon}"></i>
          </div>
          <div>
            <div class="text-[11px] font-semibold text-slate-200">${mod.name}</div>
            <div class="text-[9px] text-cyan-400 font-mono">${mod.voltage} • ${mod.pins.length} pinos</div>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button onclick="startTeachingModule('${mod.id}')" class="px-1.5 py-0.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-[9px] font-bold flex items-center gap-1 transition" title="Me ensine a montar este módulo">
            <i class="fa-solid fa-graduation-cap"></i> Ensinar
          </button>
          <button onclick="detachModule('${mod.id}')" class="text-slate-500 hover:text-rose-400 p-1 text-[11px] transition" title="Remover">
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
      <div class="p-2.5 rounded-xl border ${isAttached ? 'border-cyan-500/60 bg-cyan-950/20' : 'border-slate-800 bg-slate-950 hover:border-slate-700'} transition flex flex-col gap-1.5 group">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-white shadow" style="background-color: ${mod.color}">
              <i class="fa-solid ${mod.icon}"></i>
            </div>
            <div>
              <div class="text-[11px] font-semibold text-slate-200 group-hover:text-cyan-400 transition">${mod.name}</div>
              <div class="text-[9px] text-slate-400 flex items-center gap-1">
                <span class="capitalize">${mod.category}</span>
                <span>•</span>
                <span class="text-amber-400 font-mono">${mod.voltage}</span>
              </div>
            </div>
          </div>

          <button onclick="${isAttached ? `detachModule('${mod.id}')` : `attachModule('${mod.id}')`}" 
                  class="px-2 py-0.5 rounded text-[10px] font-semibold transition ${isAttached ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 hover:bg-rose-950 hover:text-rose-300' : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'}">
            ${isAttached ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-plus"></i>'}
          </button>
        </div>

        <div class="pt-1 border-t border-slate-900 flex items-center justify-between">
          <span class="text-[9px] text-slate-500">${mod.pins.length} conexões</span>
          <button onclick="startTeachingModule('${mod.id}')" class="text-[10px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-amber-950/40 border border-amber-800/60 px-2 py-0.5 rounded transition shadow-sm">
            <i class="fa-solid fa-graduation-cap text-[10px]"></i> Me Ensine Onde Colocar
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

function startQuickTutorial() {
  if (attachedModules.length > 0) {
    startTeachingModule(attachedModules[0]);
  } else {
    attachModule('rele_1ch');
    startTeachingModule('rele_1ch');
  }
}

// --- INTERACTIVE STEP-BY-STEP TEACHING ENGINE ---
function startTeachingModule(moduleId) {
  const mod = moduleDatabase.find(m => m.id === moduleId);
  if (!mod) return;

  if (!attachedModules.includes(moduleId)) {
    attachedModules.push(moduleId);
    renderAttachedModules();
    renderCatalog();
  }

  tutorialState.active = true;
  tutorialState.moduleId = moduleId;
  tutorialState.currentStep = 0;
  tutorialState.steps = mod.tutorialSteps || generateDefaultTutorialSteps(mod);

  const hud = document.getElementById('tutorial-hud');
  hud.classList.remove('hidden');

  renderCurrentTutorialStep();
  rebuild3dScene();
  focusCameraOnStep();
  logTestEvent(`Tutorial de montagem iniciado para: ${mod.name}`);
  savePersistentState();
  showToast(`Tutorial ativado: ${mod.name}`);
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
  wireBadge.innerHTML = `<span class="w-2 h-2 rounded-full inline-block" style="background-color: ${step.wireColor}"></span> ${step.wireName}`;
  wireBadge.style.borderColor = step.wireColor;

  document.getElementById('tut-source-pin').textContent = step.sourcePin;
  document.getElementById('tut-dest-pin').textContent = step.destPin;
  document.getElementById('tut-explanation').textContent = step.explanation;
  document.getElementById('tut-wire-kind').textContent = step.wireType;

  const dotsContainer = document.getElementById('tut-dots-container');
  dotsContainer.innerHTML = tutorialState.steps.map((_, i) => {
    return `<span class="w-2 h-2 rounded-full transition-all ${i === tutorialState.currentStep ? 'bg-amber-400 w-4' : (i < tutorialState.currentStep ? 'bg-emerald-500' : 'bg-slate-700')}"></span>`;
  }).join('');

  const prevBtn = document.getElementById('tut-btn-prev');
  const nextBtn = document.getElementById('tut-btn-next');

  if (tutorialState.currentStep === 0) {
    prevBtn.classList.add('opacity-40', 'pointer-events-none');
  } else {
    prevBtn.classList.remove('opacity-40', 'pointer-events-none');
  }

  if (tutorialState.currentStep === tutorialState.steps.length - 1) {
    nextBtn.innerHTML = '<span>Concluir!</span> <i class="fa-solid fa-check"></i>';
    nextBtn.className = 'px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition';
  } else {
    nextBtn.innerHTML = '<span>Próximo</span> <i class="fa-solid fa-chevron-right text-[10px]"></i>';
    nextBtn.className = 'px-3.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition';
  }
}

function tutorialNextStep() {
  if (tutorialState.currentStep < tutorialState.steps.length - 1) {
    tutorialState.currentStep++;
    renderCurrentTutorialStep();
    rebuild3dScene();
    focusCameraOnStep();
    logTestEvent(`Avançou tutorial: Passo ${tutorialState.currentStep + 1}`);
  } else {
    showToast('Parabéns! Você concluiu toda a montagem física deste módulo!');
    logTestEvent(`Tutorial concluído com sucesso para: ${tutorialState.moduleId}`);
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
  if (tutorialState.currentStep === 0) {
    camera.position.set(2, 14, 18);
  } else {
    camera.position.set(0, 11, 15);
  }
  controls.target.set(0, 1.5, 0);
  controls.update();
}

// --- EXACT PHYSICAL 1:1 PIN COORDINATE RESOLVER ---
// Maps every pin name of the ESP32 and Modules to its exact 3D vector
function getEspPhysicalPinCoord(pinName) {
  const mcu = MCUS[currentMcuId];
  const pinsPerRow = Math.floor(mcu.pinsCount / 2);
  const pinSpacing = 6.8 / (pinsPerRow - 1);
  const xStart = -6.7;

  // Clean pin name (e.g. 'GPIO 23', 'D23' -> 'D23')
  let clean = pinName.replace('GPIO', 'D').replace(' ', '').trim();
  if (clean === '23') clean = 'D23';
  if (clean === '22') clean = 'D22';
  if (clean === '21') clean = 'D21';
  if (clean === '19') clean = 'D19';
  if (clean === '18') clean = 'D18';
  if (clean === '5') clean = 'D5';
  if (clean === '4') clean = 'D4';
  if (clean === '2') clean = 'D2';
  if (clean === '15') clean = 'D15';
  if (clean === '13') clean = 'D13';
  if (clean === '14') clean = 'D14';
  if (clean === '25') clean = 'D25';
  if (clean === '26') clean = 'D26';
  if (clean === '27') clean = 'D27';
  if (clean === '32') clean = 'D32';
  if (clean === '33') clean = 'D33';
  if (clean === '34') clean = 'D34';
  if (clean === '35') clean = 'D35';

  // Check left row (Z = -1.65)
  for (let i = 0; i < mcu.leftPins.length; i++) {
    const p = mcu.leftPins[i];
    if (p === clean || (p.startsWith('VIN') && clean.includes('VIN')) || (p.startsWith('3V3') && clean.includes('3V3')) || (p === 'GND' && clean.includes('GND'))) {
      const x = xStart + (i * pinSpacing);
      return new THREE.Vector3(x, 2.32, -1.65);
    }
  }

  // Check right row (Z = +1.65)
  for (let i = 0; i < mcu.rightPins.length; i++) {
    const p = mcu.rightPins[i];
    if (p === clean || (p.startsWith('3V3') && clean.includes('3V3')) || (p === 'GND' && clean.includes('GND'))) {
      const x = xStart + (i * pinSpacing);
      return new THREE.Vector3(x, 2.32, 1.65);
    }
  }

  // Default fallback
  return new THREE.Vector3(-3.5, 2.32, 1.65);
}

// Module Pin Coordinates Resolver
function getModulePhysicalPinCoord(modId, modPin, modXOffset) {
  if (modId === 'rele_1ch') {
    // Relay pins: VCC, GND, IN at x = modXOffset - 1.3
    if (modPin === 'VCC') return new THREE.Vector3(modXOffset - 1.3, 2.25, -0.6);
    if (modPin === 'GND') return new THREE.Vector3(modXOffset - 1.3, 2.25, 0.0);
    if (modPin === 'IN') return new THREE.Vector3(modXOffset - 1.3, 2.25, 0.6);
  } else if (modId === 'dht22') {
    // DHT22 pins
    if (modPin === 'VCC') return new THREE.Vector3(modXOffset - 0.6, 2.0, 0.0);
    if (modPin === 'DATA') return new THREE.Vector3(modXOffset - 0.2, 2.0, 0.0);
    if (modPin === 'GND') return new THREE.Vector3(modXOffset + 0.6, 2.0, 0.0);
  } else if (modId === 'oled_i2c') {
    // OLED pins: GND, VCC, SCL, SDA at z = -1.15
    if (modPin === 'GND') return new THREE.Vector3(modXOffset - 0.75, 2.2, -1.15);
    if (modPin === 'VCC') return new THREE.Vector3(modXOffset - 0.25, 2.2, -1.15);
    if (modPin === 'SCL') return new THREE.Vector3(modXOffset + 0.25, 2.2, -1.15);
    if (modPin === 'SDA') return new THREE.Vector3(modXOffset + 0.75, 2.2, -1.15);
  } else if (modId === 'hc_sr04') {
    if (modPin === 'VCC') return new THREE.Vector3(modXOffset - 0.75, 2.2, -0.9);
    if (modPin === 'TRIG') return new THREE.Vector3(modXOffset - 0.25, 2.2, -0.9);
    if (modPin === 'ECHO') return new THREE.Vector3(modXOffset + 0.25, 2.2, -0.9);
    if (modPin === 'GND') return new THREE.Vector3(modXOffset + 0.75, 2.2, -0.9);
  }

  // Fallback for custom modules
  return new THREE.Vector3(modXOffset - 0.8, 2.2, -0.5);
}

// Floating 3D Text Pin Billboard Sprites
function createPinTextSprite(text, colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = colorHex || '#06b6d4';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(4, 4, 120, 56, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 64, 32);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.4, 0.7, 1);
  return sprite;
}

// --- TEXTURE GENERATORS ---
function generateCuttingMatTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0a1d1c';
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.strokeStyle = '#14b8a6';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 984, 984);

  ctx.strokeStyle = 'rgba(20, 184, 166, 0.15)';
  ctx.lineWidth = 1;
  for (let x = 40; x < 1000; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, 1004); ctx.stroke();
  }
  for (let y = 40; y < 1000; y += 20) {
    ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(1004, y); ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)';
  ctx.lineWidth = 2;
  for (let x = 40; x < 1000; x += 100) {
    ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, 1004); ctx.stroke();
  }
  for (let y = 40; y < 1000; y += 100) {
    ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(1004, y); ctx.stroke();
  }

  ctx.fillStyle = 'rgba(20, 184, 166, 0.7)';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('ELECTRONICS WORKBENCH - ESD SAFE', 50, 60);
  ctx.fillText('ESP32 3D LAB v3.0 • FIO A PINO 1:1', 50, 980);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function generateEsp32SilkscreenTexture(mcu) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(920, 160);
  for (let k = 0; k < 6; k++) {
    ctx.lineTo(920 + (k % 2 === 0 ? 40 : 0), 160 + k * 30);
  }
  ctx.stroke();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(30, 30, 964, 452);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 17px monospace';
  ctx.textAlign = 'center';

  const leftPins = mcu.leftPins;
  const xStart = 80;
  const xSpacing = 860 / (leftPins.length - 1);

  leftPins.forEach((pinName, i) => {
    const x = xStart + (i * xSpacing);
    ctx.fillText(pinName, x, 75);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, 105, 12, 0, Math.PI * 2);
    ctx.stroke();
  });

  const rightPins = mcu.rightPins;
  rightPins.forEach((pinName, i) => {
    const x = xStart + (i * xSpacing);
    ctx.fillText(pinName, x, 445);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, 405, 12, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('ESP32 DEVKIT V1', 450, 230);
  ctx.font = '14px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('NodeMCU-32S • Fiação 1:1 Fiel', 450, 260);

  return new THREE.CanvasTexture(canvas);
}

function generateShieldLaserTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = '#334155';
  ctx.textAlign = 'center';

  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('ESPRESSIF', 256, 120);
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText('ESP-WROOM-32', 256, 180);
  ctx.font = '18px monospace';
  ctx.fillText('FCC ID: 2AC7Z-ESPWROOM32', 256, 240);
  ctx.fillText('CE 1313 • Wi-Fi & Bluetooth', 256, 275);

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(216, 340, 80, 80);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(226, 350, 20, 20);

  return new THREE.CanvasTexture(canvas);
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
  ctx.fillText('ESP32 3D LAB v3', 15, 35);
  ctx.font = '12px Courier New, monospace';
  ctx.fillText('Memória: ATIVA', 15, 60);
  ctx.fillText('Fiação: 1:1 Fiel', 15, 80);
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

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020617);
  scene.fog = new THREE.FogExp2(0x020617, 0.02);

  camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
  camera.position.set(0, 16, 22);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.minDistance = 4;
  controls.maxDistance = 55;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.4);
  mainLight.position.set(12, 28, 16);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.bias = -0.0005;
  scene.add(mainLight);

  const warmLamp = new THREE.DirectionalLight(0xfef08a, 0.5);
  warmLamp.position.set(-15, 18, -10);
  scene.add(warmLamp);

  const cyanGlow = new THREE.PointLight(0x06b6d4, 1.8, 35);
  cyanGlow.position.set(-10, 8, 8);
  scene.add(cyanGlow);

  cuttingMatTexture = generateCuttingMatTexture();
  setupOledDynamicTexture();

  const matGeo = new THREE.PlaneGeometry(55, 45);
  const matMaterial = new THREE.MeshStandardMaterial({ map: cuttingMatTexture, roughness: 0.7, metalness: 0.05 });
  const cuttingMat = new THREE.Mesh(matGeo, matMaterial);
  cuttingMat.rotation.x = -Math.PI / 2;
  cuttingMat.position.y = -0.02;
  cuttingMat.receiveShadow = true;
  scene.add(cuttingMat);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('click', onMouseClick);

  rebuild3dScene();
  animate();
}

function rebuild3dScene() {
  if (mcuMeshGroup) scene.remove(mcuMeshGroup);
  if (breadboardMeshGroup) scene.remove(breadboardMeshGroup);
  if (modulesMeshGroup) scene.remove(modulesMeshGroup);
  if (wiresMeshGroup) scene.remove(wiresMeshGroup);
  if (tutorialHighlightGroup) scene.remove(tutorialHighlightGroup);
  if (pinLabelsGroup) scene.remove(pinLabelsGroup);

  interactivePins = [];

  mcuMeshGroup = new THREE.Group();
  breadboardMeshGroup = new THREE.Group();
  modulesMeshGroup = new THREE.Group();
  wiresMeshGroup = new THREE.Group();
  tutorialHighlightGroup = new THREE.Group();
  pinLabelsGroup = new THREE.Group();

  if (showBreadboard) {
    createBreadboard3D(breadboardMeshGroup);
  }

  createMcu3D(mcuMeshGroup, currentMcuId);
  createAttachedModules3D(modulesMeshGroup);

  if (showWires) {
    createWires3D(wiresMeshGroup, pinLabelsGroup);
  }

  if (tutorialState.active) {
    createTutorialHighlights(tutorialHighlightGroup);
  }

  scene.add(breadboardMeshGroup);
  scene.add(mcuMeshGroup);
  scene.add(modulesMeshGroup);
  scene.add(wiresMeshGroup);
  scene.add(tutorialHighlightGroup);
  scene.add(pinLabelsGroup);
}

function createBreadboard3D(group) {
  const bbWidth = 24;
  const bbHeight = 1.3;
  const bbDepth = 8.5;

  const bodyGeo = new THREE.BoxGeometry(bbWidth, bbHeight, bbDepth);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.55, metalness: 0.05 });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.position.set(0, bbHeight / 2, 0);
  bodyMesh.receiveShadow = true;
  bodyMesh.castShadow = true;
  group.add(bodyMesh);

  const notchGeo = new THREE.BoxGeometry(bbWidth - 0.6, 0.45, 0.9);
  const notchMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
  const notchMesh = new THREE.Mesh(notchGeo, notchMat);
  notchMesh.position.set(0, bbHeight, 0);
  group.add(notchMesh);

  const lineGeo = new THREE.BoxGeometry(bbWidth - 1, 0.02, 0.15);
  const redMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const blueMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });

  const topRed = new THREE.Mesh(lineGeo, redMat);
  topRed.position.set(0, bbHeight + 0.01, 3.6);
  group.add(topRed);
  const topBlue = new THREE.Mesh(lineGeo, blueMat);
  topBlue.position.set(0, bbHeight + 0.01, 3.2);
  group.add(topBlue);

  const botBlue = new THREE.Mesh(lineGeo, blueMat);
  botBlue.position.set(0, bbHeight + 0.01, -3.2);
  group.add(botBlue);
  const botRed = new THREE.Mesh(lineGeo, redMat);
  botRed.position.set(0, bbHeight + 0.01, -3.6);
  group.add(botRed);
}

function createMcu3D(group, mcuId) {
  const mcu = MCUS[mcuId];
  const pcbLength = 8.0;
  const pcbWidth = 3.8;
  const pcbThickness = 0.24;

  const pcbTexture = generateEsp32SilkscreenTexture(mcu);
  const pcbMat = new THREE.MeshStandardMaterial({ map: pcbTexture, roughness: 0.35, metalness: 0.2 });
  const pcbMesh = new THREE.Mesh(new THREE.BoxGeometry(pcbLength, pcbThickness, pcbWidth), pcbMat);
  pcbMesh.position.set(-3.5, 1.9, 0);
  pcbMesh.castShadow = true;
  pcbMesh.receiveShadow = true;
  group.add(pcbMesh);

  const shieldTex = generateShieldLaserTexture();
  const shieldGeo = new THREE.BoxGeometry(2.8, 0.42, 2.5);
  const shieldMat = new THREE.MeshStandardMaterial({ map: shieldTex, metalness: 0.92, roughness: 0.22 });
  const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
  shieldMesh.position.set(-2.8, 2.15, 0);
  shieldMesh.castShadow = true;
  group.add(shieldMesh);

  const usbMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.45, 1.1), new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95, roughness: 0.1 }));
  usbMesh.position.set(-7.1, 2.05, 0);
  group.add(usbMesh);

  const pwrLedMat = new THREE.MeshStandardMaterial({
    color: virtualPower ? 0xef4444 : 0x450a0a,
    emissive: virtualPower ? 0xef4444 : 0x000000,
    emissiveIntensity: virtualPower ? 2.2 : 0
  });
  const pwrLed = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.15, 0.22), pwrLedMat);
  pwrLed.position.set(-5.3, 2.1, -1.0);
  group.add(pwrLed);

  const gpio2LedMat = new THREE.MeshStandardMaterial({
    color: (virtualPower && virtualLedState) ? 0x06b6d4 : 0x082f49,
    emissive: (virtualPower && virtualLedState) ? 0x06b6d4 : 0x000000,
    emissiveIntensity: (virtualPower && virtualLedState) ? 2.5 : 0
  });
  const gpio2Led = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.15, 0.22), gpio2LedMat);
  gpio2Led.position.set(-5.3, 2.1, 1.0);
  group.add(gpio2Led);

  // Pin Headers at EXACT physical positions
  const pinsPerRow = Math.floor(mcu.pinsCount / 2);
  const pinSpacing = 6.8 / (pinsPerRow - 1);
  const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.85, 8);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.15 });
  const collarGeo = new THREE.BoxGeometry(0.3, 0.4, 0.3);
  const collarMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });

  for (let i = 0; i < pinsPerRow; i++) {
    const xPos = -6.7 + (i * pinSpacing);
    const zPos = -1.65;
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.position.set(xPos, 1.7, zPos);
    group.add(collar);
    const pin = new THREE.Mesh(pinGeo, pinMat.clone());
    pin.position.set(xPos, 1.9, zPos);
    pin.userData = { isPin: true, mcuPin: true, name: mcu.leftPins[i], side: 'left', index: i };
    group.add(pin);
    interactivePins.push(pin);
  }

  for (let i = 0; i < pinsPerRow; i++) {
    const xPos = -6.7 + (i * pinSpacing);
    const zPos = 1.65;
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.position.set(xPos, 1.7, zPos);
    group.add(collar);
    const pin = new THREE.Mesh(pinGeo, pinMat.clone());
    pin.position.set(xPos, 1.9, zPos);
    pin.userData = { isPin: true, mcuPin: true, name: mcu.rightPins[i], side: 'right', index: i };
    group.add(pin);
    interactivePins.push(pin);
  }
}

function createAttachedModules3D(group) {
  let offsetX = 4.2;
  attachedModules.forEach((modId) => {
    const modGroup = new THREE.Group();
    modGroup.position.set(offsetX, 1.8, 0);

    if (modId === 'rele_1ch') createRelay3D(modGroup);
    else if (modId === 'dht22') createDht223D(modGroup);
    else if (modId === 'oled_i2c') createOled3D(modGroup);
    else if (modId === 'hc_sr04') createUltrasonic3D(modGroup);
    else if (modId === 'esp01_modem') createEsp013D(modGroup);
    else if (modId === 'rf433_tx') createRf4333D(modGroup);
    else if (modId === 'pir_hc_sr501') createPir3D(modGroup);
    else createGenericModule3D(modGroup, modId);

    group.add(modGroup);
    offsetX += 5.0;
  });
}

function createEsp013D(group) {
  // PCB preta compacta 2.5 x 1.5 cm
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.16, 1.6), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 }));
  pcb.position.y = 0.08;
  pcb.castShadow = true;
  group.add(pcb);

  // Antena Wi-Fi dourada zigue-zague impressa
  const antenna = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 1.3), new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 }));
  antenna.position.set(0.8, 0.18, 0);
  group.add(antenna);

  // Chip ESP8266EX quadrado preto
  const chip = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 0.7), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 }));
  chip.position.set(0.0, 0.2, -0.2);
  group.add(chip);

  // Conector fêmea / pinos 2x4
  const header = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 1.2), new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.7 }));
  header.position.set(-0.9, 0.4, 0);
  group.add(header);

  // LED azul Wi-Fi piscante quando energizado
  const wifiLedMat = new THREE.MeshStandardMaterial({
    color: virtualPower ? 0x38bdf8 : 0x0c4a6e,
    emissive: virtualPower ? 0x38bdf8 : 0x000000,
    emissiveIntensity: virtualPower ? 2.5 : 0
  });
  const wifiLed = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.18), wifiLedMat);
  wifiLed.position.set(0.0, 0.2, 0.5);
  group.add(wifiLed);

  // Pinos interativos do ESP-01 para fiação
  const pinNames = ['GND', 'GPIO2', 'GPIO0', 'RX', 'TX', 'CH_PD', 'RST', 'VCC'];
  const pinGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.5, 6);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
  pinNames.forEach((name, i) => {
    const row = i < 4 ? -0.25 : 0.25;
    const col = -0.45 + ((i % 4) * 0.3);
    const p = new THREE.Mesh(pinGeo, pinMat);
    p.position.set(-0.9 + row, 0.8, col);
    p.userData = { isPin: true, modulePin: true, moduleId: 'esp01_modem', name: name };
    group.add(p);
    interactivePins.push(p);
  });
}

function createRf4333D(group) {
  // PCB Verde Transmissor RF 433MHz
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.18, 2.0), new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.4 }));
  pcb.position.y = 0.09;
  pcb.castShadow = true;
  group.add(pcb);

  // Bobina de cobre de RF
  const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 12), new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.9, roughness: 0.3 }));
  coil.rotation.z = Math.PI / 2;
  coil.position.set(0.2, 0.35, 0.3);
  group.add(coil);

  // Cristal de quartzo prateado SAW 433.92MHz
  const crystal = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.15, 16), new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95, roughness: 0.1 }));
  crystal.position.set(-0.4, 0.25, -0.3);
  group.add(crystal);

  // Barra de 3 pinos (VCC, DATA, GND)
  const pins = ['VCC', 'DATA', 'GND'];
  const pGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.6, 6);
  const pMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
  pins.forEach((name, i) => {
    const p = new THREE.Mesh(pGeo, pMat);
    p.position.set(-0.6 + (i * 0.6), 0.45, 0.8);
    p.userData = { isPin: true, modulePin: true, moduleId: 'rf433_tx', name: name };
    group.add(p);
    interactivePins.push(p);
  });
}

function createPir3D(group) {
  // PCB Verde HC-SR501
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.2, 2.4), new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.4 }));
  pcb.position.y = 0.1;
  pcb.castShadow = true;
  group.add(pcb);

  // Cúpula semiesférica branca Fresnel
  const domeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25, opacity: 0.92, transparent: true });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
  dome.position.set(0, 0.2, 0);
  group.add(dome);

  // Trimpots de ajuste de sensibilidade e tempo
  const pot1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.25, 8), new THREE.MeshStandardMaterial({ color: 0xeab308 }));
  pot1.position.set(1.1, 0.3, -0.6);
  group.add(pot1);
  const pot2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.25, 8), new THREE.MeshStandardMaterial({ color: 0xeab308 }));
  pot2.position.set(1.1, 0.3, 0.6);
  group.add(pot2);

  // Barra de 3 pinos (VCC, OUT, GND)
  const pins = ['VCC', 'OUT', 'GND'];
  const pGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.6, 6);
  const pMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
  pins.forEach((name, i) => {
    const p = new THREE.Mesh(pGeo, pMat);
    p.position.set(-1.2, 0.45, -0.5 + (i * 0.5));
    p.userData = { isPin: true, modulePin: true, moduleId: 'pir_hc_sr501', name: name };
    group.add(p);
    interactivePins.push(p);
  });
}

function createRelay3D(group) {
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.22, 2.8), new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 }));
  pcb.position.y = 0.11;
  pcb.castShadow = true;
  group.add(pcb);

  const cubeMat = new THREE.MeshStandardMaterial({ color: virtualRelayState ? 0x2563eb : 0x1e40af, roughness: 0.35 });
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.6, 1.9), cubeMat);
  cube.position.set(-0.4, 0.95, 0);
  cube.castShadow = true;
  group.add(cube);

  const term = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.0, 2.3), new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 }));
  term.position.set(1.2, 0.65, 0);
  group.add(term);

  const rLedMat = new THREE.MeshStandardMaterial({
    color: virtualRelayState ? 0x22c55e : 0x052e16,
    emissive: virtualRelayState ? 0x22c55e : 0x000000,
    emissiveIntensity: virtualRelayState ? 2.4 : 0
  });
  const rLed = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.15, 0.22), rLedMat);
  rLed.position.set(-0.8, 0.32, -1.0);
  group.add(rLed);

  const pins = ['VCC', 'GND', 'IN'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.65, 8), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 }));
    pin.position.set(-1.3, 0.45, -0.6 + (i * 0.6));
    pin.userData = { isPin: true, modulePin: true, module: 'rele_1ch', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createDht223D(group) {
  const caseGeo = new THREE.BoxGeometry(2.1, 2.5, 1.5);
  const caseMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45 });
  const caseMesh = new THREE.Mesh(caseGeo, caseMat);
  caseMesh.position.y = 1.35;
  caseMesh.castShadow = true;
  group.add(caseMesh);

  const pins = ['VCC', 'DATA', 'NC', 'GND'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.7, 8), new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9 }));
    pin.position.set(-0.6 + (i * 0.4), 0.2, 0);
    pin.userData = { isPin: true, modulePin: true, module: 'dht22', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createOled3D(group) {
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.22, 2.9), new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.35 }));
  pcb.position.y = 0.11;
  pcb.castShadow = true;
  group.add(pcb);

  const screenGeo = new THREE.BoxGeometry(2.5, 0.1, 1.9);
  const screenMat = new THREE.MeshBasicMaterial({ map: oledTexture });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.28, 0.3);
  group.add(screen);

  const pins = ['GND', 'VCC', 'SCL', 'SDA'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 }));
    pin.position.set(-0.75 + (i * 0.5), 0.4, -1.15);
    pin.userData = { isPin: true, modulePin: true, module: 'oled_i2c', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createUltrasonic3D(group) {
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, 2.4), new THREE.MeshStandardMaterial({ color: 0x1d4ed8 }));
  pcb.position.y = 0.11;
  pcb.castShadow = true;
  group.add(pcb);

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

  const pins = ['VCC', 'TRIG', 'ECHO', 'GND'];
  pins.forEach((pName, i) => {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 }));
    pin.position.set(-0.75 + (i * 0.5), 0.4, -0.9);
    pin.userData = { isPin: true, modulePin: true, module: 'hc_sr04', name: pName };
    group.add(pin);
    interactivePins.push(pin);
  });
}

function createGenericModule3D(group, modId) {
  const mod = moduleDatabase.find(m => m.id === modId);
  const colorHex = mod ? parseInt(mod.color.replace('#', '0x')) : 0x06b6d4;
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.22, 2.7), new THREE.MeshStandardMaterial({ color: colorHex }));
  pcb.position.y = 0.11;
  pcb.castShadow = true;
  group.add(pcb);
}

// 1:1 PHYSICAL WIRES ENGINE WITH 3D PIN LABELS
function createWires3D(wireGroup, labelGroup) {
  if (attachedModules.length === 0) return;

  let modXOffset = 4.2;

  attachedModules.forEach(modId => {
    const mod = moduleDatabase.find(m => m.id === modId);
    if (!mod || !mod.defaultEspPins) {
      modXOffset += 5.0;
      return;
    }

    let maxWireIndex = 999;
    if (tutorialState.active && tutorialState.moduleId === modId) {
      maxWireIndex = tutorialState.currentStep - 1;
    }

    Object.entries(mod.defaultEspPins).forEach(([modPin, espPin], pinIndex) => {
      if (tutorialState.active && tutorialState.moduleId === modId && pinIndex > maxWireIndex) {
        return;
      }

      // Exact Physical Coordinates for Start & End
      const pStart = getEspPhysicalPinCoord(espPin);
      const pEnd = getModulePhysicalPinCoord(modId, modPin, modXOffset);

      // DuPont Sleeves
      const dupontGeo = new THREE.BoxGeometry(0.24, 0.55, 0.24);
      const dupontMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });

      const d1 = new THREE.Mesh(dupontGeo, dupontMat);
      d1.position.set(pStart.x, pStart.y + 0.1, pStart.z);
      wireGroup.add(d1);

      const d2 = new THREE.Mesh(dupontGeo, dupontMat);
      d2.position.set(pEnd.x, pEnd.y + 0.1, pEnd.z);
      wireGroup.add(d2);

      // Catenary sag / Bézier curve between exact pins
      const midX = (pStart.x + pEnd.x) / 2;
      const archHeight = Math.max(pStart.y, pEnd.y) + 2.4 + (pinIndex * 0.4);
      const midZ = (pStart.z + pEnd.z) / 2 + 1.0;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(pStart.x, pStart.y + 0.35, pStart.z),
        new THREE.Vector3(pStart.x, pStart.y + 1.0, pStart.z),
        new THREE.Vector3(midX, archHeight, midZ),
        new THREE.Vector3(pEnd.x, pEnd.y + 1.0, pEnd.z),
        new THREE.Vector3(pEnd.x, pEnd.y + 0.35, pEnd.z)
      ]);

      const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.08, 10, false);
      const wireColorHex = mod.wireColors && mod.wireColors[modPin] ? parseInt(mod.wireColors[modPin].replace('#', '0x')) : 0xeab308;
      const tubeMat = new THREE.MeshStandardMaterial({ color: wireColorHex, roughness: 0.25, metalness: 0.08 });
      const wireMesh = new THREE.Mesh(tubeGeo, tubeMat);
      wireMesh.castShadow = true;
      wireGroup.add(wireMesh);

      // Floating 3D Billboards right above the pins
      const espLabel = createPinTextSprite(espPin, (mod.wireColors && mod.wireColors[modPin]) || '#06b6d4');
      espLabel.position.set(pStart.x, pStart.y + 1.2, pStart.z);
      labelGroup.add(espLabel);

      const modLabel = createPinTextSprite(modPin, (mod.wireColors && mod.wireColors[modPin]) || '#06b6d4');
      modLabel.position.set(pEnd.x, pEnd.y + 1.1, pEnd.z);
      labelGroup.add(modLabel);
    });

    modXOffset += 5.0;
  });
}

function createTutorialHighlights(group) {
  if (!tutorialState.active) return;
  const step = tutorialState.steps[tutorialState.currentStep];
  if (!step) return;

  if (tutorialState.currentStep === 0) {
    const ringGeo = new THREE.RingGeometry(1.6, 2.0, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(4.2, 1.85, 0);
    group.add(ring);
  } else {
    const highlightGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const highlightMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true });

    const p1 = new THREE.Mesh(highlightGeo, highlightMat);
    const espCoord = getEspPhysicalPinCoord(step.sourcePin);
    p1.position.copy(espCoord);
    group.add(p1);

    const p2 = new THREE.Mesh(highlightGeo, highlightMat);
    const modCoord = getModulePhysicalPinCoord(tutorialState.moduleId, step.destPin.replace('Relé: ', '').replace('DHT22: ', '').replace('OLED: ', '').replace('HC-SR04: ', ''), 4.2);
    p2.position.copy(modCoord);
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
    document.getElementById('hover-pin-type').textContent = pinData.mcuPin ? 'Pino Fiel MCU' : 'Pino Módulo';
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
    <div class="p-2.5 bg-cyan-950/30 border border-cyan-500/40 rounded-xl space-y-1.5">
      <div class="text-[11px] font-bold text-cyan-300 flex items-center justify-between">
        <span>${pinName}</span>
        <span class="text-[9px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">Inspecionado</span>
      </div>
      <p class="text-slate-300 text-[10px] leading-relaxed">${desc}</p>
      <div class="text-[9px] text-slate-400 pt-1 border-t border-slate-800 flex items-center justify-between">
        <span>Tensão Segura:</span>
        <span class="text-white font-bold">${pinName.includes('5V') || pinName.includes('VIN') ? '5.0V' : '3.3V'}</span>
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
  if (width === 0 || height === 0) return;
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

      rowsHtml += `
        <tr class="hover:bg-slate-900/60 transition cursor-pointer" onclick="highlightWireFromTable('${mod.id}', '${modPin}')">
          <td class="py-2.5 px-3">
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-700" style="background-color: ${wireHex}25; color: ${wireHex === '#0f172a' ? '#94a3b8' : wireHex}">
              <span class="w-2 h-2 rounded-full inline-block" style="background-color: ${wireHex}"></span>
              ${wireName}
            </span>
          </td>
          <td class="py-2.5 px-3 font-semibold text-slate-200">${mod.name}</td>
          <td class="py-2.5 px-3 text-amber-300 font-bold">${modPin}</td>
          <td class="py-2.5 px-3 text-emerald-400 font-bold">${espPin}</td>
          <td class="py-2.5 px-3 text-right">
            <button onclick="event.stopPropagation(); startTeachingModule('${mod.id}')" class="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 rounded text-[9px] font-bold border border-amber-500/40 transition">
              <i class="fa-solid fa-graduation-cap"></i> Ensinar no 3D
            </button>
          </td>
        </tr>
      `;
    });
  });

  tbody.innerHTML = rowsHtml;
}

function highlightWireFromTable(modId, pinName) {
  startTeachingModule(modId);
  showToast(`Destacando fio do pino ${pinName} no modelo 3D ao lado!`);
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
    badge.className = 'text-[9px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 animate-pulse font-semibold';
    logTestEvent('Alimentação USB 5V ligada.');
  } else {
    btn.textContent = 'LIGAR';
    btn.className = 'px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition';
    badge.textContent = 'Desligado';
    badge.className = 'text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700';
    logTestEvent('Alimentação USB desligada.');
  }

  rebuild3dScene();
  updateVirtualControls();
  savePersistentState();
  showToast(virtualPower ? 'ESP32 Alimentado! LEDs ativos.' : 'Alimentação desligada.');
}

function toggleOnboardLed() {
  if (!virtualPower) {
    showToast('Ligue a alimentação virtual primeiro!');
    return;
  }
  virtualLedState = !virtualLedState;
  const statusEl = document.getElementById('virtual-led-status');
  if (virtualLedState) {
    statusEl.className = 'w-2.5 h-2.5 rounded-full bg-cyan-400 shadow shadow-cyan-400 inline-block';
    logTestEvent('LED Azul Onboard (GPIO 2) ACESO (HIGH).');
  } else {
    statusEl.className = 'w-2.5 h-2.5 rounded-full bg-slate-700 inline-block';
    logTestEvent('LED Azul Onboard (GPIO 2) APAGADO (LOW).');
  }
  rebuild3dScene();
  savePersistentState();
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
  logTestEvent(virtualRelayState ? 'Relé ATIVADO (Bobina energizada, contato NO fechado).' : 'Relé DESATIVADO.');
  savePersistentState();
  showToast(virtualRelayState ? 'Relé ATIVADO (Veja a cor mudar no modelo 3D!)' : 'Relé DESATIVADO (Contato Aberto)');
}

function updateVirtualDht(tempVal, humVal) {
  virtualDhtTemp = parseFloat(tempVal);
  virtualDhtHum = parseInt(humVal);
  const tEl = document.getElementById('lbl-virtual-temp');
  const hEl = document.getElementById('lbl-virtual-hum');
  if (tEl) tEl.textContent = `${virtualDhtTemp.toFixed(1)} °C`;
  if (hEl) hEl.textContent = `${virtualDhtHum} %`;
  updateOledTextureText(virtualDhtTemp, virtualDhtHum);
  savePersistentState();
}

function updateVirtualControls() {
  const container = document.getElementById('virtual-modules-controls');
  if (!container) return;

  let html = '';

  if (attachedModules.includes('rele_1ch')) {
    html += `
      <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-semibold text-slate-300">Módulo Relé (Pino D23)</span>
          <button onclick="toggleVirtualRelay()" class="px-2.5 py-1 ${virtualRelayState ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'} rounded-lg text-xs font-bold transition">
            ${virtualRelayState ? 'DESATIVAR' : 'ATIVAR'}
          </button>
        </div>
        <div class="text-[10px] text-slate-400">
          Status no 3D: <span class="${virtualRelayState ? 'text-blue-400 font-bold' : 'text-slate-500'}">${virtualRelayState ? 'ATIVADO (Cubo azul aceso)' : 'DESLIGADO (Em repouso)'}</span>
        </div>
      </div>
    `;
  }

  if (attachedModules.includes('dht22')) {
    html += `
      <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
        <div class="text-xs font-semibold text-slate-300">Simulador Sensor DHT22 (Pino D4)</div>
        <div>
          <div class="flex justify-between text-[10px] text-slate-400">
            <span>Temperatura:</span>
            <span id="lbl-virtual-temp" class="text-cyan-400 font-bold">${virtualDhtTemp} °C</span>
          </div>
          <input type="range" min="10" max="50" step="0.5" value="${virtualDhtTemp}" oninput="updateVirtualDht(this.value, virtualDhtHum)" class="w-full accent-cyan-500 h-1 bg-slate-800 rounded">
        </div>
        <div>
          <div class="flex justify-between text-[10px] text-slate-400">
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
      <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div class="text-xs font-semibold text-slate-300 mb-1">Display OLED I2C (Pinos D21/D22)</div>
        <div class="text-[10px] text-emerald-400 flex items-center gap-1.5">
          <i class="fa-solid fa-circle-check"></i> Renderizando ao vivo na tela 3D ao lado
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

// --- FIRMWARE CODE GENERATOR ---
function generateFirmwareCode() {
  const codeOutput = document.getElementById('code-output');
  if (!codeOutput) return;

  const isArduino = currentMcuId === 'arduino_uno';

  let includes = ['#include <Arduino.h>'];
  let defines = [];
  let setupCode = [
    '  Serial.begin(9600);',
    '  delay(500);',
    `  Serial.println("--- ${isArduino ? 'Arduino Uno Hub' : 'ESP32 Lab'} Iniciado ---");`
  ];
  let loopCode = [];

  if (isArduino) {
    defines.push('// Modo Arduino Uno: Hub de Sensores com Ponte Wi-Fi ESP-01');
    if (attachedModules.includes('esp01_modem')) {
      includes.push('#include <SoftwareSerial.h>');
      defines.push('SoftwareSerial espSerial(10, 11); // RX=D10 (do TX do ESP), TX=D11 (para RX do ESP via divisor 1k/2k)');
      setupCode.push('  espSerial.begin(9600);');
      setupCode.push('  Serial.println("Comunicacao SoftwareSerial com ESP-01 pronta.");');
      loopCode.push('  // Envia pacote de telemetria serial para o ESP-01');
      loopCode.push('  espSerial.print("TELEMETRY:");');
    }
    if (attachedModules.includes('dht22')) {
      includes.push('#include <DHT.h>');
      defines.push('#define DHTPIN 2');
      defines.push('#define DHTTYPE DHT22');
      defines.push('DHT dht(DHTPIN, DHTTYPE);');
      setupCode.push('  dht.begin();');
      loopCode.push('  float temp = dht.readTemperature();');
      loopCode.push('  float umid = dht.readHumidity();');
      loopCode.push('  Serial.print("Temp: "); Serial.print(temp); Serial.print(" C | Umid: "); Serial.println(umid);');
      if (attachedModules.includes('esp01_modem')) {
        loopCode.push('  espSerial.print("temp="); espSerial.print(temp); espSerial.print("&umid="); espSerial.print(umid);');
      }
    }
    if (attachedModules.includes('pir_hc_sr501')) {
      defines.push('#define PIR_PIN 3');
      setupCode.push('  pinMode(PIR_PIN, INPUT);');
      loopCode.push('  int presenca = digitalRead(PIR_PIN);');
      loopCode.push('  if (presenca == HIGH) { Serial.println(">>> MOVIMENTO DETECTADO!"); }');
      if (attachedModules.includes('esp01_modem')) {
        loopCode.push('  espSerial.print("&pir="); espSerial.println(presenca);');
      }
    }
    loopCode.push('  delay(2000);');
  } else {
    defines.push('#define LED_ONBOARD 2');
    setupCode.push('  pinMode(LED_ONBOARD, OUTPUT);');

    if (attachedModules.includes('rele_1ch')) {
      defines.push('#define RELAY_PIN 15');
      setupCode.push('  pinMode(RELAY_PIN, OUTPUT);');
      setupCode.push('  digitalWrite(RELAY_PIN, LOW); // Relé desligado');
      loopCode.push('  // Aciona relé e LED');
      loopCode.push('  digitalWrite(RELAY_PIN, HIGH);');
      loopCode.push('  digitalWrite(LED_ONBOARD, HIGH);');
      loopCode.push('  delay(2000);');
      loopCode.push('  digitalWrite(RELAY_PIN, LOW);');
      loopCode.push('  digitalWrite(LED_ONBOARD, LOW);');
      loopCode.push('  delay(2000);');
    }

    if (attachedModules.includes('rf433_tx')) {
      includes.push('#include <RCSwitch.h>');
      defines.push('#define RF_PIN 4');
      defines.push('RCSwitch rfTransmitter = RCSwitch();');
      setupCode.push('  rfTransmitter.enableTransmit(RF_PIN);');
      setupCode.push('  rfTransmitter.setPulseLength(350);');
      loopCode.push('  // Envia código RF EV1527 (ex: tomada ligar)');
      loopCode.push('  rfTransmitter.send(1234567, 24);');
      loopCode.push('  Serial.println("Sinal RF 433MHz transmitido!");');
    }

    if (attachedModules.includes('oled_i2c')) {
      includes.push('#include <Wire.h>');
      includes.push('#include <Adafruit_GFX.h>');
      includes.push('#include <Adafruit_SSD1306.h>');
      defines.push('#define SCREEN_WIDTH 128');
      defines.push('#define SCREEN_HEIGHT 64');
      defines.push('Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);');
      setupCode.push('  Wire.begin(21, 22); // SDA, SCL');
      setupCode.push('  if(display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {');
      setupCode.push('    display.clearDisplay();');
      setupCode.push('    display.setTextSize(1); display.setTextColor(WHITE);');
      setupCode.push('    display.setCursor(0, 10); display.println("Central ESP32 RF");');
      setupCode.push('    display.display();');
      setupCode.push('  }');
    }
  }

  const fullCode = `// ==========================================
// Código Firmware para ${isArduino ? 'Arduino Uno R3 (Nó Hub)' : 'ESP32 DevKit'}
// Projeto: ${PROJECT_PRESETS[currentProjectId] ? PROJECT_PRESETS[currentProjectId].name : 'Personalizado'}
// Fiação Fiel 1:1 • ESP32 & Arduino 3D Lab Studio
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
    logTestEvent('Código de firmware copiado para a área de transferência.');
    showToast('Código copiado com sucesso!');
  });
}

// --- DATABASE CATALOG EXPLORER ---
function renderDatabaseExplorer() {
  const container = document.getElementById('database-grid');
  if (!container) return;

  container.innerHTML = moduleDatabase.map(mod => {
    return `
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-cyan-500/40 transition flex flex-col justify-between shadow-lg">
        <div>
          <div class="flex items-center justify-between mb-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base shadow" style="background-color: ${mod.color}">
              <i class="fa-solid ${mod.icon}"></i>
            </div>
            <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-400">
              ${mod.voltage}
            </span>
          </div>
          <h3 class="font-bold text-xs text-white">${mod.name}</h3>
          <p class="text-[10px] text-slate-400 mt-0.5 leading-relaxed">${mod.desc}</p>
          
          <div class="mt-2.5 pt-2 border-t border-slate-800/80">
            <span class="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Pinos Físicos:</span>
            <div class="flex flex-wrap gap-1">
              ${mod.pins.map(p => `<span class="text-[9px] bg-slate-950 px-1.5 py-0.5 rounded text-cyan-300 font-mono border border-slate-800">${p}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="mt-3 pt-2.5 flex items-center justify-between border-t border-slate-800">
          <button onclick="startTeachingModule('${mod.id}')" class="text-[10px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
            <i class="fa-solid fa-graduation-cap"></i> Ensinar no 3D
          </button>
          <button onclick="attachModule('${mod.id}');" class="px-2.5 py-0.5 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white rounded text-[10px] font-semibold transition">
            Colocar no 3D
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
  savePersistentState();
  renderCatalog();
  renderDatabaseExplorer();
  closeNewModuleModal();
  logTestEvent(`Novo módulo cadastrado no banco: ${name}`);
  showToast(`Módulo "${name}" salvo com sucesso no banco!`);
}

// Export / Backup
function exportProjectData() {
  const exportPayload = {
    version: '3.0',
    timestamp: new Date().toISOString(),
    mcu: currentMcuId,
    attachedModules,
    userNotes: userProjectNotes,
    testLogs: testHistoryLogs,
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

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  toastMsg.textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}
