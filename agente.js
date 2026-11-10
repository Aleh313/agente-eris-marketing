/**
 * Módulo Autónomo 24/7 y Comunicación para: Eris Boreas Greyrat
 * Rol: Dirección Creativa, Video & Redes Sociales
 * Carpeta: agentes/05_eris_cm_redes/agente.js
 */
const fs = require('fs');
const path = require('path');
const MessageBus = require('../bus_comunicacion');

module.exports = {
  id: 'ag_eris',
  name: 'Eris Boreas Greyrat',
  folder: '05_eris_cm_redes',
  role: 'Dirección Creativa, Video & Redes Sociales',
  sector: 'ventas',

  // Inicialización del agente al arrancar el servidor
  init(db, helpers) {
    console.log('🤖 [Agente Activo 24/7] Eris Boreas Greyrat inicializado con sus skills.');
    this.checkPendingMessages();
  },

  // Revisar mensajes entrantes dirigidos a este agente
  checkPendingMessages() {
    const unread = MessageBus.getMessagesForAgent(this.id, true);
    if (unread.length > 0) {
      console.log(`📬 [${this.name}] Tiene ${unread.length} mensajes pendientes en el bus.`);
      unread.forEach(msg => this.processIncomingMessage(msg));
    }
    return unread;
  },

  // Procesar mensaje entrante de otro agente
  processIncomingMessage(msg) {
    console.log(`📨 [${this.name}] Procesando mensaje de ${msg.fromAgentId}: "${msg.subject}"`);
    // Marcar como leído
    MessageBus.markAsRead(msg.id);
    return { ok: true, processed: msg.id };
  },

  // Enviar mensaje o directiva a otro agente
  sendMessage(toAgentId, subject, body, payload = {}, type = 'directiva') {
    return MessageBus.sendMessage({
      fromAgentId: this.id,
      toAgentId,
      type,
      subject,
      body,
      payload
    });
  },

  // Ejecución de tareas programadas o invocadas desde la UI
  async runTask(payload = {}, db = null) {
    return {
      ok: true,
      agentId: this.id,
      name: this.name,
      role: this.role,
      skills: ["Dirección Creativa & Storytelling Emocional","Creador de Video Automatizado","Diseño de Identidad y Preventa"],
      timestamp: new Date().toISOString(),
      message: `[${this.name}] Tarea ejecutada con éxito bajo protocolo autónomo.`
    };
  }
};
