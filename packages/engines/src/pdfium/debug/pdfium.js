
var createPdfiumModule = (function() {
  var _scriptDir = import.meta.url;
  
  return (
function(createPdfiumModule) {
  createPdfiumModule = createPdfiumModule || {};



// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof createPdfiumModule !== 'undefined' ? createPdfiumModule : {};

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;
Module['ready'] = new Promise(function(resolve, reject) {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_IsSupportedSubtype')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_IsSupportedSubtype', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_IsSupportedSubtype on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_IsSupportedSubtype', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_IsSupportedSubtype on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_CreateAnnot')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_CreateAnnot', { configurable: true, get: function() { abort('You are getting _FPDFPage_CreateAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_CreateAnnot', { configurable: true, set: function() { abort('You are setting _FPDFPage_CreateAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetAnnotCount')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetAnnotCount', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetAnnotCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetAnnotCount', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetAnnotCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetAnnot')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetAnnot', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetAnnot', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetAnnotIndex')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetAnnotIndex', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetAnnotIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetAnnotIndex', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetAnnotIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_CloseAnnot')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_CloseAnnot', { configurable: true, get: function() { abort('You are getting _FPDFPage_CloseAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_CloseAnnot', { configurable: true, set: function() { abort('You are setting _FPDFPage_CloseAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_RemoveAnnot')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_RemoveAnnot', { configurable: true, get: function() { abort('You are getting _FPDFPage_RemoveAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_RemoveAnnot', { configurable: true, set: function() { abort('You are setting _FPDFPage_RemoveAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetSubtype')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetSubtype', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetSubtype on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetSubtype', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetSubtype on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_IsObjectSupportedSubtype')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_IsObjectSupportedSubtype', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_IsObjectSupportedSubtype on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_IsObjectSupportedSubtype', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_IsObjectSupportedSubtype on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_UpdateObject')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_UpdateObject', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_UpdateObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_UpdateObject', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_UpdateObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_AddInkStroke')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_AddInkStroke', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_AddInkStroke on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_AddInkStroke', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_AddInkStroke on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_RemoveInkList')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_RemoveInkList', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_RemoveInkList on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_RemoveInkList', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_RemoveInkList on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_AppendObject')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_AppendObject', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_AppendObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_AppendObject', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_AppendObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetObjectCount')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetObjectCount', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetObjectCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetObjectCount', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetObjectCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetObject')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetObject', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetObject', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_RemoveObject')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_RemoveObject', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_RemoveObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_RemoveObject', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_RemoveObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_SetColor')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetColor', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_SetColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetColor', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_SetColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetColor')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetColor', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetColor', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_HasAttachmentPoints')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_HasAttachmentPoints', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_HasAttachmentPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_HasAttachmentPoints', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_HasAttachmentPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_SetAttachmentPoints')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetAttachmentPoints', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_SetAttachmentPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetAttachmentPoints', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_SetAttachmentPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_AppendAttachmentPoints')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_AppendAttachmentPoints', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_AppendAttachmentPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_AppendAttachmentPoints', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_AppendAttachmentPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_CountAttachmentPoints')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_CountAttachmentPoints', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_CountAttachmentPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_CountAttachmentPoints', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_CountAttachmentPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetAttachmentPoints')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetAttachmentPoints', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetAttachmentPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetAttachmentPoints', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetAttachmentPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_SetRect')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetRect', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_SetRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetRect', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_SetRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetRect')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetRect', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetRect', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetVertices')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetVertices', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetVertices on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetVertices', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetVertices on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetInkListCount')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetInkListCount', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetInkListCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetInkListCount', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetInkListCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetInkListPath')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetInkListPath', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetInkListPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetInkListPath', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetInkListPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetLine')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetLine', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetLine on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetLine', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetLine on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_SetBorder')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetBorder', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_SetBorder on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetBorder', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_SetBorder on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetBorder')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetBorder', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetBorder on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetBorder', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetBorder on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_HasKey')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_HasKey', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_HasKey on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_HasKey', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_HasKey on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetValueType')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetValueType', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetValueType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetValueType', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetValueType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_SetStringValue')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetStringValue', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_SetStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetStringValue', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_SetStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetStringValue')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetStringValue', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetStringValue', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetNumberValue')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetNumberValue', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetNumberValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetNumberValue', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetNumberValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_SetAP')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetAP', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_SetAP on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetAP', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_SetAP on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetAP')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetAP', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetAP on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetAP', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetAP on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetLinkedAnnot')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetLinkedAnnot', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetLinkedAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetLinkedAnnot', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetLinkedAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFlags')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFlags', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFlags on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFlags', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFlags on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_SetFlags')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetFlags', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_SetFlags on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetFlags', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_SetFlags on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFormFieldFlags')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldFlags', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFormFieldFlags on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldFlags', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFormFieldFlags on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFormFieldAtPoint')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldAtPoint', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFormFieldAtPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldAtPoint', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFormFieldAtPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFormFieldName')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldName', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFormFieldName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldName', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFormFieldName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFormFieldType')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldType', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFormFieldType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldType', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFormFieldType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFormFieldValue')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldValue', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFormFieldValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldValue', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFormFieldValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetOptionCount')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetOptionCount', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetOptionCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetOptionCount', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetOptionCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetOptionLabel')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetOptionLabel', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetOptionLabel on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetOptionLabel', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetOptionLabel on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_IsOptionSelected')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_IsOptionSelected', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_IsOptionSelected on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_IsOptionSelected', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_IsOptionSelected on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFontSize')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFontSize', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFontSize on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFontSize', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFontSize on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_IsChecked')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_IsChecked', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_IsChecked on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_IsChecked', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_IsChecked on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_SetFocusableSubtypes')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetFocusableSubtypes', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_SetFocusableSubtypes on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetFocusableSubtypes', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_SetFocusableSubtypes on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFocusableSubtypesCount')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFocusableSubtypesCount', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFocusableSubtypesCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFocusableSubtypesCount', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFocusableSubtypesCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFocusableSubtypes')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFocusableSubtypes', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFocusableSubtypes on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFocusableSubtypes', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFocusableSubtypes on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetLink')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetLink', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetLink on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetLink', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetLink on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFormControlCount')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormControlCount', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFormControlCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormControlCount', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFormControlCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFormControlIndex')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormControlIndex', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFormControlIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormControlIndex', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFormControlIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_GetFormFieldExportValue')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldExportValue', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_GetFormFieldExportValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_GetFormFieldExportValue', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_GetFormFieldExportValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAnnot_SetURI')) {
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetURI', { configurable: true, get: function() { abort('You are getting _FPDFAnnot_SetURI on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAnnot_SetURI', { configurable: true, set: function() { abort('You are setting _FPDFAnnot_SetURI on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDoc_GetAttachmentCount')) {
        Object.defineProperty(Module['ready'], '_FPDFDoc_GetAttachmentCount', { configurable: true, get: function() { abort('You are getting _FPDFDoc_GetAttachmentCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDoc_GetAttachmentCount', { configurable: true, set: function() { abort('You are setting _FPDFDoc_GetAttachmentCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDoc_AddAttachment')) {
        Object.defineProperty(Module['ready'], '_FPDFDoc_AddAttachment', { configurable: true, get: function() { abort('You are getting _FPDFDoc_AddAttachment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDoc_AddAttachment', { configurable: true, set: function() { abort('You are setting _FPDFDoc_AddAttachment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDoc_GetAttachment')) {
        Object.defineProperty(Module['ready'], '_FPDFDoc_GetAttachment', { configurable: true, get: function() { abort('You are getting _FPDFDoc_GetAttachment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDoc_GetAttachment', { configurable: true, set: function() { abort('You are setting _FPDFDoc_GetAttachment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDoc_DeleteAttachment')) {
        Object.defineProperty(Module['ready'], '_FPDFDoc_DeleteAttachment', { configurable: true, get: function() { abort('You are getting _FPDFDoc_DeleteAttachment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDoc_DeleteAttachment', { configurable: true, set: function() { abort('You are setting _FPDFDoc_DeleteAttachment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAttachment_GetName')) {
        Object.defineProperty(Module['ready'], '_FPDFAttachment_GetName', { configurable: true, get: function() { abort('You are getting _FPDFAttachment_GetName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAttachment_GetName', { configurable: true, set: function() { abort('You are setting _FPDFAttachment_GetName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAttachment_HasKey')) {
        Object.defineProperty(Module['ready'], '_FPDFAttachment_HasKey', { configurable: true, get: function() { abort('You are getting _FPDFAttachment_HasKey on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAttachment_HasKey', { configurable: true, set: function() { abort('You are setting _FPDFAttachment_HasKey on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAttachment_GetValueType')) {
        Object.defineProperty(Module['ready'], '_FPDFAttachment_GetValueType', { configurable: true, get: function() { abort('You are getting _FPDFAttachment_GetValueType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAttachment_GetValueType', { configurable: true, set: function() { abort('You are setting _FPDFAttachment_GetValueType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAttachment_SetStringValue')) {
        Object.defineProperty(Module['ready'], '_FPDFAttachment_SetStringValue', { configurable: true, get: function() { abort('You are getting _FPDFAttachment_SetStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAttachment_SetStringValue', { configurable: true, set: function() { abort('You are setting _FPDFAttachment_SetStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAttachment_GetStringValue')) {
        Object.defineProperty(Module['ready'], '_FPDFAttachment_GetStringValue', { configurable: true, get: function() { abort('You are getting _FPDFAttachment_GetStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAttachment_GetStringValue', { configurable: true, set: function() { abort('You are setting _FPDFAttachment_GetStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAttachment_SetFile')) {
        Object.defineProperty(Module['ready'], '_FPDFAttachment_SetFile', { configurable: true, get: function() { abort('You are getting _FPDFAttachment_SetFile on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAttachment_SetFile', { configurable: true, set: function() { abort('You are setting _FPDFAttachment_SetFile on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAttachment_GetFile')) {
        Object.defineProperty(Module['ready'], '_FPDFAttachment_GetFile', { configurable: true, get: function() { abort('You are getting _FPDFAttachment_GetFile on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAttachment_GetFile', { configurable: true, set: function() { abort('You are setting _FPDFAttachment_GetFile on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFCatalog_IsTagged')) {
        Object.defineProperty(Module['ready'], '_FPDFCatalog_IsTagged', { configurable: true, get: function() { abort('You are getting _FPDFCatalog_IsTagged on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFCatalog_IsTagged', { configurable: true, set: function() { abort('You are setting _FPDFCatalog_IsTagged on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAvail_Create')) {
        Object.defineProperty(Module['ready'], '_FPDFAvail_Create', { configurable: true, get: function() { abort('You are getting _FPDFAvail_Create on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAvail_Create', { configurable: true, set: function() { abort('You are setting _FPDFAvail_Create on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAvail_Destroy')) {
        Object.defineProperty(Module['ready'], '_FPDFAvail_Destroy', { configurable: true, get: function() { abort('You are getting _FPDFAvail_Destroy on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAvail_Destroy', { configurable: true, set: function() { abort('You are setting _FPDFAvail_Destroy on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAvail_IsDocAvail')) {
        Object.defineProperty(Module['ready'], '_FPDFAvail_IsDocAvail', { configurable: true, get: function() { abort('You are getting _FPDFAvail_IsDocAvail on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAvail_IsDocAvail', { configurable: true, set: function() { abort('You are setting _FPDFAvail_IsDocAvail on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAvail_GetDocument')) {
        Object.defineProperty(Module['ready'], '_FPDFAvail_GetDocument', { configurable: true, get: function() { abort('You are getting _FPDFAvail_GetDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAvail_GetDocument', { configurable: true, set: function() { abort('You are setting _FPDFAvail_GetDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAvail_GetFirstPageNum')) {
        Object.defineProperty(Module['ready'], '_FPDFAvail_GetFirstPageNum', { configurable: true, get: function() { abort('You are getting _FPDFAvail_GetFirstPageNum on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAvail_GetFirstPageNum', { configurable: true, set: function() { abort('You are setting _FPDFAvail_GetFirstPageNum on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAvail_IsPageAvail')) {
        Object.defineProperty(Module['ready'], '_FPDFAvail_IsPageAvail', { configurable: true, get: function() { abort('You are getting _FPDFAvail_IsPageAvail on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAvail_IsPageAvail', { configurable: true, set: function() { abort('You are setting _FPDFAvail_IsPageAvail on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAvail_IsFormAvail')) {
        Object.defineProperty(Module['ready'], '_FPDFAvail_IsFormAvail', { configurable: true, get: function() { abort('You are getting _FPDFAvail_IsFormAvail on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAvail_IsFormAvail', { configurable: true, set: function() { abort('You are setting _FPDFAvail_IsFormAvail on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAvail_IsLinearized')) {
        Object.defineProperty(Module['ready'], '_FPDFAvail_IsLinearized', { configurable: true, get: function() { abort('You are getting _FPDFAvail_IsLinearized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAvail_IsLinearized', { configurable: true, set: function() { abort('You are setting _FPDFAvail_IsLinearized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBookmark_GetFirstChild')) {
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetFirstChild', { configurable: true, get: function() { abort('You are getting _FPDFBookmark_GetFirstChild on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetFirstChild', { configurable: true, set: function() { abort('You are setting _FPDFBookmark_GetFirstChild on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBookmark_GetNextSibling')) {
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetNextSibling', { configurable: true, get: function() { abort('You are getting _FPDFBookmark_GetNextSibling on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetNextSibling', { configurable: true, set: function() { abort('You are setting _FPDFBookmark_GetNextSibling on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBookmark_GetTitle')) {
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetTitle', { configurable: true, get: function() { abort('You are getting _FPDFBookmark_GetTitle on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetTitle', { configurable: true, set: function() { abort('You are setting _FPDFBookmark_GetTitle on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBookmark_GetCount')) {
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetCount', { configurable: true, get: function() { abort('You are getting _FPDFBookmark_GetCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetCount', { configurable: true, set: function() { abort('You are setting _FPDFBookmark_GetCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBookmark_Find')) {
        Object.defineProperty(Module['ready'], '_FPDFBookmark_Find', { configurable: true, get: function() { abort('You are getting _FPDFBookmark_Find on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBookmark_Find', { configurable: true, set: function() { abort('You are setting _FPDFBookmark_Find on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBookmark_GetDest')) {
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetDest', { configurable: true, get: function() { abort('You are getting _FPDFBookmark_GetDest on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetDest', { configurable: true, set: function() { abort('You are setting _FPDFBookmark_GetDest on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBookmark_GetAction')) {
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetAction', { configurable: true, get: function() { abort('You are getting _FPDFBookmark_GetAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBookmark_GetAction', { configurable: true, set: function() { abort('You are setting _FPDFBookmark_GetAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAction_GetType')) {
        Object.defineProperty(Module['ready'], '_FPDFAction_GetType', { configurable: true, get: function() { abort('You are getting _FPDFAction_GetType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAction_GetType', { configurable: true, set: function() { abort('You are setting _FPDFAction_GetType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAction_GetDest')) {
        Object.defineProperty(Module['ready'], '_FPDFAction_GetDest', { configurable: true, get: function() { abort('You are getting _FPDFAction_GetDest on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAction_GetDest', { configurable: true, set: function() { abort('You are setting _FPDFAction_GetDest on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAction_GetFilePath')) {
        Object.defineProperty(Module['ready'], '_FPDFAction_GetFilePath', { configurable: true, get: function() { abort('You are getting _FPDFAction_GetFilePath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAction_GetFilePath', { configurable: true, set: function() { abort('You are setting _FPDFAction_GetFilePath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFAction_GetURIPath')) {
        Object.defineProperty(Module['ready'], '_FPDFAction_GetURIPath', { configurable: true, get: function() { abort('You are getting _FPDFAction_GetURIPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFAction_GetURIPath', { configurable: true, set: function() { abort('You are setting _FPDFAction_GetURIPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDest_GetDestPageIndex')) {
        Object.defineProperty(Module['ready'], '_FPDFDest_GetDestPageIndex', { configurable: true, get: function() { abort('You are getting _FPDFDest_GetDestPageIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDest_GetDestPageIndex', { configurable: true, set: function() { abort('You are setting _FPDFDest_GetDestPageIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDest_GetView')) {
        Object.defineProperty(Module['ready'], '_FPDFDest_GetView', { configurable: true, get: function() { abort('You are getting _FPDFDest_GetView on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDest_GetView', { configurable: true, set: function() { abort('You are setting _FPDFDest_GetView on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDest_GetLocationInPage')) {
        Object.defineProperty(Module['ready'], '_FPDFDest_GetLocationInPage', { configurable: true, get: function() { abort('You are getting _FPDFDest_GetLocationInPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDest_GetLocationInPage', { configurable: true, set: function() { abort('You are setting _FPDFDest_GetLocationInPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_GetLinkAtPoint')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_GetLinkAtPoint', { configurable: true, get: function() { abort('You are getting _FPDFLink_GetLinkAtPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_GetLinkAtPoint', { configurable: true, set: function() { abort('You are setting _FPDFLink_GetLinkAtPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_GetLinkZOrderAtPoint')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_GetLinkZOrderAtPoint', { configurable: true, get: function() { abort('You are getting _FPDFLink_GetLinkZOrderAtPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_GetLinkZOrderAtPoint', { configurable: true, set: function() { abort('You are setting _FPDFLink_GetLinkZOrderAtPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_GetDest')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_GetDest', { configurable: true, get: function() { abort('You are getting _FPDFLink_GetDest on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_GetDest', { configurable: true, set: function() { abort('You are setting _FPDFLink_GetDest on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_GetAction')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_GetAction', { configurable: true, get: function() { abort('You are getting _FPDFLink_GetAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_GetAction', { configurable: true, set: function() { abort('You are setting _FPDFLink_GetAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_Enumerate')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_Enumerate', { configurable: true, get: function() { abort('You are getting _FPDFLink_Enumerate on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_Enumerate', { configurable: true, set: function() { abort('You are setting _FPDFLink_Enumerate on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_GetAnnot')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_GetAnnot', { configurable: true, get: function() { abort('You are getting _FPDFLink_GetAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_GetAnnot', { configurable: true, set: function() { abort('You are setting _FPDFLink_GetAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_GetAnnotRect')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_GetAnnotRect', { configurable: true, get: function() { abort('You are getting _FPDFLink_GetAnnotRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_GetAnnotRect', { configurable: true, set: function() { abort('You are setting _FPDFLink_GetAnnotRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_CountQuadPoints')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_CountQuadPoints', { configurable: true, get: function() { abort('You are getting _FPDFLink_CountQuadPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_CountQuadPoints', { configurable: true, set: function() { abort('You are setting _FPDFLink_CountQuadPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_GetQuadPoints')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_GetQuadPoints', { configurable: true, get: function() { abort('You are getting _FPDFLink_GetQuadPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_GetQuadPoints', { configurable: true, set: function() { abort('You are setting _FPDFLink_GetQuadPoints on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetPageAAction')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetPageAAction', { configurable: true, get: function() { abort('You are getting _FPDF_GetPageAAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetPageAAction', { configurable: true, set: function() { abort('You are setting _FPDF_GetPageAAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetFileIdentifier')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetFileIdentifier', { configurable: true, get: function() { abort('You are getting _FPDF_GetFileIdentifier on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetFileIdentifier', { configurable: true, set: function() { abort('You are setting _FPDF_GetFileIdentifier on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetMetaText')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetMetaText', { configurable: true, get: function() { abort('You are getting _FPDF_GetMetaText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetMetaText', { configurable: true, set: function() { abort('You are setting _FPDF_GetMetaText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetPageLabel')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetPageLabel', { configurable: true, get: function() { abort('You are getting _FPDF_GetPageLabel on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetPageLabel', { configurable: true, set: function() { abort('You are setting _FPDF_GetPageLabel on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_CreateNewDocument')) {
        Object.defineProperty(Module['ready'], '_FPDF_CreateNewDocument', { configurable: true, get: function() { abort('You are getting _FPDF_CreateNewDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_CreateNewDocument', { configurable: true, set: function() { abort('You are setting _FPDF_CreateNewDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_New')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_New', { configurable: true, get: function() { abort('You are getting _FPDFPage_New on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_New', { configurable: true, set: function() { abort('You are setting _FPDFPage_New on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_Delete')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_Delete', { configurable: true, get: function() { abort('You are getting _FPDFPage_Delete on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_Delete', { configurable: true, set: function() { abort('You are setting _FPDFPage_Delete on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetRotation')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetRotation', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetRotation on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetRotation', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetRotation on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_SetRotation')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_SetRotation', { configurable: true, get: function() { abort('You are getting _FPDFPage_SetRotation on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_SetRotation', { configurable: true, set: function() { abort('You are setting _FPDFPage_SetRotation on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_InsertObject')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_InsertObject', { configurable: true, get: function() { abort('You are getting _FPDFPage_InsertObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_InsertObject', { configurable: true, set: function() { abort('You are setting _FPDFPage_InsertObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_RemoveObject')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_RemoveObject', { configurable: true, get: function() { abort('You are getting _FPDFPage_RemoveObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_RemoveObject', { configurable: true, set: function() { abort('You are setting _FPDFPage_RemoveObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_CountObjects')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_CountObjects', { configurable: true, get: function() { abort('You are getting _FPDFPage_CountObjects on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_CountObjects', { configurable: true, set: function() { abort('You are setting _FPDFPage_CountObjects on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetObject')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetObject', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetObject', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_HasTransparency')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_HasTransparency', { configurable: true, get: function() { abort('You are getting _FPDFPage_HasTransparency on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_HasTransparency', { configurable: true, set: function() { abort('You are setting _FPDFPage_HasTransparency on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GenerateContent')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GenerateContent', { configurable: true, get: function() { abort('You are getting _FPDFPage_GenerateContent on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GenerateContent', { configurable: true, set: function() { abort('You are setting _FPDFPage_GenerateContent on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_Destroy')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_Destroy', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_Destroy on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_Destroy', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_Destroy on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_HasTransparency')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_HasTransparency', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_HasTransparency on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_HasTransparency', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_HasTransparency on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetType')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetType', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetType', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_Transform')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_Transform', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_Transform on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_Transform', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_Transform on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetMatrix')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetMatrix', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetMatrix on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetMatrix', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetMatrix on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_SetMatrix')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetMatrix', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_SetMatrix on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetMatrix', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_SetMatrix on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_TransformAnnots')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_TransformAnnots', { configurable: true, get: function() { abort('You are getting _FPDFPage_TransformAnnots on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_TransformAnnots', { configurable: true, set: function() { abort('You are setting _FPDFPage_TransformAnnots on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_NewImageObj')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_NewImageObj', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_NewImageObj on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_NewImageObj', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_NewImageObj on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_CountMarks')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_CountMarks', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_CountMarks on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_CountMarks', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_CountMarks on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetMark')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetMark', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetMark on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetMark', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetMark on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_AddMark')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_AddMark', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_AddMark on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_AddMark', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_AddMark on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_RemoveMark')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_RemoveMark', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_RemoveMark on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_RemoveMark', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_RemoveMark on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_GetName')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetName', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_GetName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetName', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_GetName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_CountParams')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_CountParams', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_CountParams on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_CountParams', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_CountParams on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_GetParamKey')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetParamKey', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_GetParamKey on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetParamKey', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_GetParamKey on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_GetParamValueType')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetParamValueType', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_GetParamValueType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetParamValueType', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_GetParamValueType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_GetParamIntValue')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetParamIntValue', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_GetParamIntValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetParamIntValue', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_GetParamIntValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_GetParamStringValue')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetParamStringValue', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_GetParamStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetParamStringValue', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_GetParamStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_GetParamBlobValue')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetParamBlobValue', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_GetParamBlobValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_GetParamBlobValue', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_GetParamBlobValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_SetIntParam')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_SetIntParam', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_SetIntParam on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_SetIntParam', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_SetIntParam on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_SetStringParam')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_SetStringParam', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_SetStringParam on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_SetStringParam', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_SetStringParam on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_SetBlobParam')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_SetBlobParam', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_SetBlobParam on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_SetBlobParam', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_SetBlobParam on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObjMark_RemoveParam')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_RemoveParam', { configurable: true, get: function() { abort('You are getting _FPDFPageObjMark_RemoveParam on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObjMark_RemoveParam', { configurable: true, set: function() { abort('You are setting _FPDFPageObjMark_RemoveParam on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_LoadJpegFile')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_LoadJpegFile', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_LoadJpegFile on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_LoadJpegFile', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_LoadJpegFile on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_LoadJpegFileInline')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_LoadJpegFileInline', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_LoadJpegFileInline on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_LoadJpegFileInline', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_LoadJpegFileInline on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_SetMatrix')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_SetMatrix', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_SetMatrix on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_SetMatrix', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_SetMatrix on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_SetBitmap')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_SetBitmap', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_SetBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_SetBitmap', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_SetBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_GetBitmap')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetBitmap', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_GetBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetBitmap', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_GetBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_GetRenderedBitmap')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetRenderedBitmap', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_GetRenderedBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetRenderedBitmap', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_GetRenderedBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_GetImageDataDecoded')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetImageDataDecoded', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_GetImageDataDecoded on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetImageDataDecoded', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_GetImageDataDecoded on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_GetImageDataRaw')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetImageDataRaw', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_GetImageDataRaw on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetImageDataRaw', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_GetImageDataRaw on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_GetImageFilterCount')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetImageFilterCount', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_GetImageFilterCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetImageFilterCount', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_GetImageFilterCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_GetImageFilter')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetImageFilter', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_GetImageFilter on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetImageFilter', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_GetImageFilter on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFImageObj_GetImageMetadata')) {
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetImageMetadata', { configurable: true, get: function() { abort('You are getting _FPDFImageObj_GetImageMetadata on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFImageObj_GetImageMetadata', { configurable: true, set: function() { abort('You are setting _FPDFImageObj_GetImageMetadata on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_CreateNewPath')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_CreateNewPath', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_CreateNewPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_CreateNewPath', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_CreateNewPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_CreateNewRect')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_CreateNewRect', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_CreateNewRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_CreateNewRect', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_CreateNewRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetBounds')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetBounds', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetBounds on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetBounds', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetBounds on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetRotatedBounds')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetRotatedBounds', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetRotatedBounds on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetRotatedBounds', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetRotatedBounds on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_SetBlendMode')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetBlendMode', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_SetBlendMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetBlendMode', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_SetBlendMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_SetStrokeColor')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetStrokeColor', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_SetStrokeColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetStrokeColor', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_SetStrokeColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetStrokeColor')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetStrokeColor', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetStrokeColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetStrokeColor', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetStrokeColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_SetStrokeWidth')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetStrokeWidth', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_SetStrokeWidth on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetStrokeWidth', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_SetStrokeWidth on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetStrokeWidth')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetStrokeWidth', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetStrokeWidth on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetStrokeWidth', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetStrokeWidth on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetLineJoin')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetLineJoin', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetLineJoin on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetLineJoin', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetLineJoin on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_SetLineJoin')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetLineJoin', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_SetLineJoin on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetLineJoin', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_SetLineJoin on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetLineCap')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetLineCap', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetLineCap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetLineCap', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetLineCap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_SetLineCap')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetLineCap', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_SetLineCap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetLineCap', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_SetLineCap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_SetFillColor')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetFillColor', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_SetFillColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetFillColor', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_SetFillColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetFillColor')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetFillColor', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetFillColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetFillColor', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetFillColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetDashPhase')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetDashPhase', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetDashPhase on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetDashPhase', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetDashPhase on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_SetDashPhase')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetDashPhase', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_SetDashPhase on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetDashPhase', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_SetDashPhase on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetDashCount')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetDashCount', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetDashCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetDashCount', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetDashCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetDashArray')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetDashArray', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetDashArray on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetDashArray', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetDashArray on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_SetDashArray')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetDashArray', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_SetDashArray on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_SetDashArray', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_SetDashArray on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPath_CountSegments')) {
        Object.defineProperty(Module['ready'], '_FPDFPath_CountSegments', { configurable: true, get: function() { abort('You are getting _FPDFPath_CountSegments on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPath_CountSegments', { configurable: true, set: function() { abort('You are setting _FPDFPath_CountSegments on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPath_GetPathSegment')) {
        Object.defineProperty(Module['ready'], '_FPDFPath_GetPathSegment', { configurable: true, get: function() { abort('You are getting _FPDFPath_GetPathSegment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPath_GetPathSegment', { configurable: true, set: function() { abort('You are setting _FPDFPath_GetPathSegment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPathSegment_GetPoint')) {
        Object.defineProperty(Module['ready'], '_FPDFPathSegment_GetPoint', { configurable: true, get: function() { abort('You are getting _FPDFPathSegment_GetPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPathSegment_GetPoint', { configurable: true, set: function() { abort('You are setting _FPDFPathSegment_GetPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPathSegment_GetType')) {
        Object.defineProperty(Module['ready'], '_FPDFPathSegment_GetType', { configurable: true, get: function() { abort('You are getting _FPDFPathSegment_GetType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPathSegment_GetType', { configurable: true, set: function() { abort('You are setting _FPDFPathSegment_GetType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPathSegment_GetClose')) {
        Object.defineProperty(Module['ready'], '_FPDFPathSegment_GetClose', { configurable: true, get: function() { abort('You are getting _FPDFPathSegment_GetClose on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPathSegment_GetClose', { configurable: true, set: function() { abort('You are setting _FPDFPathSegment_GetClose on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPath_MoveTo')) {
        Object.defineProperty(Module['ready'], '_FPDFPath_MoveTo', { configurable: true, get: function() { abort('You are getting _FPDFPath_MoveTo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPath_MoveTo', { configurable: true, set: function() { abort('You are setting _FPDFPath_MoveTo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPath_LineTo')) {
        Object.defineProperty(Module['ready'], '_FPDFPath_LineTo', { configurable: true, get: function() { abort('You are getting _FPDFPath_LineTo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPath_LineTo', { configurable: true, set: function() { abort('You are setting _FPDFPath_LineTo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPath_BezierTo')) {
        Object.defineProperty(Module['ready'], '_FPDFPath_BezierTo', { configurable: true, get: function() { abort('You are getting _FPDFPath_BezierTo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPath_BezierTo', { configurable: true, set: function() { abort('You are setting _FPDFPath_BezierTo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPath_Close')) {
        Object.defineProperty(Module['ready'], '_FPDFPath_Close', { configurable: true, get: function() { abort('You are getting _FPDFPath_Close on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPath_Close', { configurable: true, set: function() { abort('You are setting _FPDFPath_Close on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPath_SetDrawMode')) {
        Object.defineProperty(Module['ready'], '_FPDFPath_SetDrawMode', { configurable: true, get: function() { abort('You are getting _FPDFPath_SetDrawMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPath_SetDrawMode', { configurable: true, set: function() { abort('You are setting _FPDFPath_SetDrawMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPath_GetDrawMode')) {
        Object.defineProperty(Module['ready'], '_FPDFPath_GetDrawMode', { configurable: true, get: function() { abort('You are getting _FPDFPath_GetDrawMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPath_GetDrawMode', { configurable: true, set: function() { abort('You are setting _FPDFPath_GetDrawMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_NewTextObj')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_NewTextObj', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_NewTextObj on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_NewTextObj', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_NewTextObj on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_SetText')) {
        Object.defineProperty(Module['ready'], '_FPDFText_SetText', { configurable: true, get: function() { abort('You are getting _FPDFText_SetText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_SetText', { configurable: true, set: function() { abort('You are setting _FPDFText_SetText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_SetCharcodes')) {
        Object.defineProperty(Module['ready'], '_FPDFText_SetCharcodes', { configurable: true, get: function() { abort('You are getting _FPDFText_SetCharcodes on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_SetCharcodes', { configurable: true, set: function() { abort('You are setting _FPDFText_SetCharcodes on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_LoadFont')) {
        Object.defineProperty(Module['ready'], '_FPDFText_LoadFont', { configurable: true, get: function() { abort('You are getting _FPDFText_LoadFont on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_LoadFont', { configurable: true, set: function() { abort('You are setting _FPDFText_LoadFont on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_LoadStandardFont')) {
        Object.defineProperty(Module['ready'], '_FPDFText_LoadStandardFont', { configurable: true, get: function() { abort('You are getting _FPDFText_LoadStandardFont on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_LoadStandardFont', { configurable: true, set: function() { abort('You are setting _FPDFText_LoadStandardFont on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFTextObj_GetFontSize')) {
        Object.defineProperty(Module['ready'], '_FPDFTextObj_GetFontSize', { configurable: true, get: function() { abort('You are getting _FPDFTextObj_GetFontSize on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFTextObj_GetFontSize', { configurable: true, set: function() { abort('You are setting _FPDFTextObj_GetFontSize on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_Close')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_Close', { configurable: true, get: function() { abort('You are getting _FPDFFont_Close on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_Close', { configurable: true, set: function() { abort('You are setting _FPDFFont_Close on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_CreateTextObj')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_CreateTextObj', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_CreateTextObj on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_CreateTextObj', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_CreateTextObj on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFTextObj_GetTextRenderMode')) {
        Object.defineProperty(Module['ready'], '_FPDFTextObj_GetTextRenderMode', { configurable: true, get: function() { abort('You are getting _FPDFTextObj_GetTextRenderMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFTextObj_GetTextRenderMode', { configurable: true, set: function() { abort('You are setting _FPDFTextObj_GetTextRenderMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFTextObj_SetTextRenderMode')) {
        Object.defineProperty(Module['ready'], '_FPDFTextObj_SetTextRenderMode', { configurable: true, get: function() { abort('You are getting _FPDFTextObj_SetTextRenderMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFTextObj_SetTextRenderMode', { configurable: true, set: function() { abort('You are setting _FPDFTextObj_SetTextRenderMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFTextObj_GetText')) {
        Object.defineProperty(Module['ready'], '_FPDFTextObj_GetText', { configurable: true, get: function() { abort('You are getting _FPDFTextObj_GetText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFTextObj_GetText', { configurable: true, set: function() { abort('You are setting _FPDFTextObj_GetText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFTextObj_GetRenderedBitmap')) {
        Object.defineProperty(Module['ready'], '_FPDFTextObj_GetRenderedBitmap', { configurable: true, get: function() { abort('You are getting _FPDFTextObj_GetRenderedBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFTextObj_GetRenderedBitmap', { configurable: true, set: function() { abort('You are setting _FPDFTextObj_GetRenderedBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFTextObj_GetFont')) {
        Object.defineProperty(Module['ready'], '_FPDFTextObj_GetFont', { configurable: true, get: function() { abort('You are getting _FPDFTextObj_GetFont on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFTextObj_GetFont', { configurable: true, set: function() { abort('You are setting _FPDFTextObj_GetFont on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_GetFontName')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_GetFontName', { configurable: true, get: function() { abort('You are getting _FPDFFont_GetFontName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_GetFontName', { configurable: true, set: function() { abort('You are setting _FPDFFont_GetFontName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_GetFontData')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_GetFontData', { configurable: true, get: function() { abort('You are getting _FPDFFont_GetFontData on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_GetFontData', { configurable: true, set: function() { abort('You are setting _FPDFFont_GetFontData on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_GetIsEmbedded')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_GetIsEmbedded', { configurable: true, get: function() { abort('You are getting _FPDFFont_GetIsEmbedded on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_GetIsEmbedded', { configurable: true, set: function() { abort('You are setting _FPDFFont_GetIsEmbedded on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_GetFlags')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_GetFlags', { configurable: true, get: function() { abort('You are getting _FPDFFont_GetFlags on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_GetFlags', { configurable: true, set: function() { abort('You are setting _FPDFFont_GetFlags on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_GetWeight')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_GetWeight', { configurable: true, get: function() { abort('You are getting _FPDFFont_GetWeight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_GetWeight', { configurable: true, set: function() { abort('You are setting _FPDFFont_GetWeight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_GetItalicAngle')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_GetItalicAngle', { configurable: true, get: function() { abort('You are getting _FPDFFont_GetItalicAngle on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_GetItalicAngle', { configurable: true, set: function() { abort('You are setting _FPDFFont_GetItalicAngle on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_GetAscent')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_GetAscent', { configurable: true, get: function() { abort('You are getting _FPDFFont_GetAscent on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_GetAscent', { configurable: true, set: function() { abort('You are setting _FPDFFont_GetAscent on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_GetDescent')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_GetDescent', { configurable: true, get: function() { abort('You are getting _FPDFFont_GetDescent on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_GetDescent', { configurable: true, set: function() { abort('You are setting _FPDFFont_GetDescent on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_GetGlyphWidth')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_GetGlyphWidth', { configurable: true, get: function() { abort('You are getting _FPDFFont_GetGlyphWidth on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_GetGlyphWidth', { configurable: true, set: function() { abort('You are setting _FPDFFont_GetGlyphWidth on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFont_GetGlyphPath')) {
        Object.defineProperty(Module['ready'], '_FPDFFont_GetGlyphPath', { configurable: true, get: function() { abort('You are getting _FPDFFont_GetGlyphPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFont_GetGlyphPath', { configurable: true, set: function() { abort('You are setting _FPDFFont_GetGlyphPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFGlyphPath_CountGlyphSegments')) {
        Object.defineProperty(Module['ready'], '_FPDFGlyphPath_CountGlyphSegments', { configurable: true, get: function() { abort('You are getting _FPDFGlyphPath_CountGlyphSegments on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFGlyphPath_CountGlyphSegments', { configurable: true, set: function() { abort('You are setting _FPDFGlyphPath_CountGlyphSegments on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFGlyphPath_GetGlyphPathSegment')) {
        Object.defineProperty(Module['ready'], '_FPDFGlyphPath_GetGlyphPathSegment', { configurable: true, get: function() { abort('You are getting _FPDFGlyphPath_GetGlyphPathSegment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFGlyphPath_GetGlyphPathSegment', { configurable: true, set: function() { abort('You are setting _FPDFGlyphPath_GetGlyphPathSegment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFormObj_CountObjects')) {
        Object.defineProperty(Module['ready'], '_FPDFFormObj_CountObjects', { configurable: true, get: function() { abort('You are getting _FPDFFormObj_CountObjects on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFormObj_CountObjects', { configurable: true, set: function() { abort('You are setting _FPDFFormObj_CountObjects on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFFormObj_GetObject')) {
        Object.defineProperty(Module['ready'], '_FPDFFormObj_GetObject', { configurable: true, get: function() { abort('You are getting _FPDFFormObj_GetObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFFormObj_GetObject', { configurable: true, set: function() { abort('You are setting _FPDFFormObj_GetObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FSDK_SetUnSpObjProcessHandler')) {
        Object.defineProperty(Module['ready'], '_FSDK_SetUnSpObjProcessHandler', { configurable: true, get: function() { abort('You are getting _FSDK_SetUnSpObjProcessHandler on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FSDK_SetUnSpObjProcessHandler', { configurable: true, set: function() { abort('You are setting _FSDK_SetUnSpObjProcessHandler on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FSDK_SetTimeFunction')) {
        Object.defineProperty(Module['ready'], '_FSDK_SetTimeFunction', { configurable: true, get: function() { abort('You are getting _FSDK_SetTimeFunction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FSDK_SetTimeFunction', { configurable: true, set: function() { abort('You are setting _FSDK_SetTimeFunction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FSDK_SetLocaltimeFunction')) {
        Object.defineProperty(Module['ready'], '_FSDK_SetLocaltimeFunction', { configurable: true, get: function() { abort('You are getting _FSDK_SetLocaltimeFunction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FSDK_SetLocaltimeFunction', { configurable: true, set: function() { abort('You are setting _FSDK_SetLocaltimeFunction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDoc_GetPageMode')) {
        Object.defineProperty(Module['ready'], '_FPDFDoc_GetPageMode', { configurable: true, get: function() { abort('You are getting _FPDFDoc_GetPageMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDoc_GetPageMode', { configurable: true, set: function() { abort('You are setting _FPDFDoc_GetPageMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_Flatten')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_Flatten', { configurable: true, get: function() { abort('You are getting _FPDFPage_Flatten on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_Flatten', { configurable: true, set: function() { abort('You are setting _FPDFPage_Flatten on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDOC_InitFormFillEnvironment')) {
        Object.defineProperty(Module['ready'], '_FPDFDOC_InitFormFillEnvironment', { configurable: true, get: function() { abort('You are getting _FPDFDOC_InitFormFillEnvironment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDOC_InitFormFillEnvironment', { configurable: true, set: function() { abort('You are setting _FPDFDOC_InitFormFillEnvironment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDOC_ExitFormFillEnvironment')) {
        Object.defineProperty(Module['ready'], '_FPDFDOC_ExitFormFillEnvironment', { configurable: true, get: function() { abort('You are getting _FPDFDOC_ExitFormFillEnvironment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDOC_ExitFormFillEnvironment', { configurable: true, set: function() { abort('You are setting _FPDFDOC_ExitFormFillEnvironment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnAfterLoadPage')) {
        Object.defineProperty(Module['ready'], '_FORM_OnAfterLoadPage', { configurable: true, get: function() { abort('You are getting _FORM_OnAfterLoadPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnAfterLoadPage', { configurable: true, set: function() { abort('You are setting _FORM_OnAfterLoadPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnBeforeClosePage')) {
        Object.defineProperty(Module['ready'], '_FORM_OnBeforeClosePage', { configurable: true, get: function() { abort('You are getting _FORM_OnBeforeClosePage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnBeforeClosePage', { configurable: true, set: function() { abort('You are setting _FORM_OnBeforeClosePage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_DoDocumentJSAction')) {
        Object.defineProperty(Module['ready'], '_FORM_DoDocumentJSAction', { configurable: true, get: function() { abort('You are getting _FORM_DoDocumentJSAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_DoDocumentJSAction', { configurable: true, set: function() { abort('You are setting _FORM_DoDocumentJSAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_DoDocumentOpenAction')) {
        Object.defineProperty(Module['ready'], '_FORM_DoDocumentOpenAction', { configurable: true, get: function() { abort('You are getting _FORM_DoDocumentOpenAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_DoDocumentOpenAction', { configurable: true, set: function() { abort('You are setting _FORM_DoDocumentOpenAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_DoDocumentAAction')) {
        Object.defineProperty(Module['ready'], '_FORM_DoDocumentAAction', { configurable: true, get: function() { abort('You are getting _FORM_DoDocumentAAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_DoDocumentAAction', { configurable: true, set: function() { abort('You are setting _FORM_DoDocumentAAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_DoPageAAction')) {
        Object.defineProperty(Module['ready'], '_FORM_DoPageAAction', { configurable: true, get: function() { abort('You are getting _FORM_DoPageAAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_DoPageAAction', { configurable: true, set: function() { abort('You are setting _FORM_DoPageAAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnMouseMove')) {
        Object.defineProperty(Module['ready'], '_FORM_OnMouseMove', { configurable: true, get: function() { abort('You are getting _FORM_OnMouseMove on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnMouseMove', { configurable: true, set: function() { abort('You are setting _FORM_OnMouseMove on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnMouseWheel')) {
        Object.defineProperty(Module['ready'], '_FORM_OnMouseWheel', { configurable: true, get: function() { abort('You are getting _FORM_OnMouseWheel on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnMouseWheel', { configurable: true, set: function() { abort('You are setting _FORM_OnMouseWheel on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnFocus')) {
        Object.defineProperty(Module['ready'], '_FORM_OnFocus', { configurable: true, get: function() { abort('You are getting _FORM_OnFocus on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnFocus', { configurable: true, set: function() { abort('You are setting _FORM_OnFocus on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnLButtonDown')) {
        Object.defineProperty(Module['ready'], '_FORM_OnLButtonDown', { configurable: true, get: function() { abort('You are getting _FORM_OnLButtonDown on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnLButtonDown', { configurable: true, set: function() { abort('You are setting _FORM_OnLButtonDown on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnRButtonDown')) {
        Object.defineProperty(Module['ready'], '_FORM_OnRButtonDown', { configurable: true, get: function() { abort('You are getting _FORM_OnRButtonDown on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnRButtonDown', { configurable: true, set: function() { abort('You are setting _FORM_OnRButtonDown on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnLButtonUp')) {
        Object.defineProperty(Module['ready'], '_FORM_OnLButtonUp', { configurable: true, get: function() { abort('You are getting _FORM_OnLButtonUp on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnLButtonUp', { configurable: true, set: function() { abort('You are setting _FORM_OnLButtonUp on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnRButtonUp')) {
        Object.defineProperty(Module['ready'], '_FORM_OnRButtonUp', { configurable: true, get: function() { abort('You are getting _FORM_OnRButtonUp on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnRButtonUp', { configurable: true, set: function() { abort('You are setting _FORM_OnRButtonUp on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnLButtonDoubleClick')) {
        Object.defineProperty(Module['ready'], '_FORM_OnLButtonDoubleClick', { configurable: true, get: function() { abort('You are getting _FORM_OnLButtonDoubleClick on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnLButtonDoubleClick', { configurable: true, set: function() { abort('You are setting _FORM_OnLButtonDoubleClick on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnKeyDown')) {
        Object.defineProperty(Module['ready'], '_FORM_OnKeyDown', { configurable: true, get: function() { abort('You are getting _FORM_OnKeyDown on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnKeyDown', { configurable: true, set: function() { abort('You are setting _FORM_OnKeyDown on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnKeyUp')) {
        Object.defineProperty(Module['ready'], '_FORM_OnKeyUp', { configurable: true, get: function() { abort('You are getting _FORM_OnKeyUp on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnKeyUp', { configurable: true, set: function() { abort('You are setting _FORM_OnKeyUp on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_OnChar')) {
        Object.defineProperty(Module['ready'], '_FORM_OnChar', { configurable: true, get: function() { abort('You are getting _FORM_OnChar on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_OnChar', { configurable: true, set: function() { abort('You are setting _FORM_OnChar on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_GetFocusedText')) {
        Object.defineProperty(Module['ready'], '_FORM_GetFocusedText', { configurable: true, get: function() { abort('You are getting _FORM_GetFocusedText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_GetFocusedText', { configurable: true, set: function() { abort('You are setting _FORM_GetFocusedText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_GetSelectedText')) {
        Object.defineProperty(Module['ready'], '_FORM_GetSelectedText', { configurable: true, get: function() { abort('You are getting _FORM_GetSelectedText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_GetSelectedText', { configurable: true, set: function() { abort('You are setting _FORM_GetSelectedText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_ReplaceSelection')) {
        Object.defineProperty(Module['ready'], '_FORM_ReplaceSelection', { configurable: true, get: function() { abort('You are getting _FORM_ReplaceSelection on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_ReplaceSelection', { configurable: true, set: function() { abort('You are setting _FORM_ReplaceSelection on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_SelectAllText')) {
        Object.defineProperty(Module['ready'], '_FORM_SelectAllText', { configurable: true, get: function() { abort('You are getting _FORM_SelectAllText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_SelectAllText', { configurable: true, set: function() { abort('You are setting _FORM_SelectAllText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_CanUndo')) {
        Object.defineProperty(Module['ready'], '_FORM_CanUndo', { configurable: true, get: function() { abort('You are getting _FORM_CanUndo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_CanUndo', { configurable: true, set: function() { abort('You are setting _FORM_CanUndo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_CanRedo')) {
        Object.defineProperty(Module['ready'], '_FORM_CanRedo', { configurable: true, get: function() { abort('You are getting _FORM_CanRedo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_CanRedo', { configurable: true, set: function() { abort('You are setting _FORM_CanRedo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_Undo')) {
        Object.defineProperty(Module['ready'], '_FORM_Undo', { configurable: true, get: function() { abort('You are getting _FORM_Undo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_Undo', { configurable: true, set: function() { abort('You are setting _FORM_Undo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_Redo')) {
        Object.defineProperty(Module['ready'], '_FORM_Redo', { configurable: true, get: function() { abort('You are getting _FORM_Redo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_Redo', { configurable: true, set: function() { abort('You are setting _FORM_Redo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_ForceToKillFocus')) {
        Object.defineProperty(Module['ready'], '_FORM_ForceToKillFocus', { configurable: true, get: function() { abort('You are getting _FORM_ForceToKillFocus on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_ForceToKillFocus', { configurable: true, set: function() { abort('You are setting _FORM_ForceToKillFocus on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_GetFocusedAnnot')) {
        Object.defineProperty(Module['ready'], '_FORM_GetFocusedAnnot', { configurable: true, get: function() { abort('You are getting _FORM_GetFocusedAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_GetFocusedAnnot', { configurable: true, set: function() { abort('You are setting _FORM_GetFocusedAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_SetFocusedAnnot')) {
        Object.defineProperty(Module['ready'], '_FORM_SetFocusedAnnot', { configurable: true, get: function() { abort('You are getting _FORM_SetFocusedAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_SetFocusedAnnot', { configurable: true, set: function() { abort('You are setting _FORM_SetFocusedAnnot on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_HasFormFieldAtPoint')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_HasFormFieldAtPoint', { configurable: true, get: function() { abort('You are getting _FPDFPage_HasFormFieldAtPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_HasFormFieldAtPoint', { configurable: true, set: function() { abort('You are setting _FPDFPage_HasFormFieldAtPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_FormFieldZOrderAtPoint')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_FormFieldZOrderAtPoint', { configurable: true, get: function() { abort('You are getting _FPDFPage_FormFieldZOrderAtPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_FormFieldZOrderAtPoint', { configurable: true, set: function() { abort('You are setting _FPDFPage_FormFieldZOrderAtPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_SetFormFieldHighlightColor')) {
        Object.defineProperty(Module['ready'], '_FPDF_SetFormFieldHighlightColor', { configurable: true, get: function() { abort('You are getting _FPDF_SetFormFieldHighlightColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_SetFormFieldHighlightColor', { configurable: true, set: function() { abort('You are setting _FPDF_SetFormFieldHighlightColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_SetFormFieldHighlightAlpha')) {
        Object.defineProperty(Module['ready'], '_FPDF_SetFormFieldHighlightAlpha', { configurable: true, get: function() { abort('You are getting _FPDF_SetFormFieldHighlightAlpha on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_SetFormFieldHighlightAlpha', { configurable: true, set: function() { abort('You are setting _FPDF_SetFormFieldHighlightAlpha on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_RemoveFormFieldHighlight')) {
        Object.defineProperty(Module['ready'], '_FPDF_RemoveFormFieldHighlight', { configurable: true, get: function() { abort('You are getting _FPDF_RemoveFormFieldHighlight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_RemoveFormFieldHighlight', { configurable: true, set: function() { abort('You are setting _FPDF_RemoveFormFieldHighlight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_FFLDraw')) {
        Object.defineProperty(Module['ready'], '_FPDF_FFLDraw', { configurable: true, get: function() { abort('You are getting _FPDF_FFLDraw on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_FFLDraw', { configurable: true, set: function() { abort('You are setting _FPDF_FFLDraw on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetFormType')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetFormType', { configurable: true, get: function() { abort('You are getting _FPDF_GetFormType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetFormType', { configurable: true, set: function() { abort('You are setting _FPDF_GetFormType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_SetIndexSelected')) {
        Object.defineProperty(Module['ready'], '_FORM_SetIndexSelected', { configurable: true, get: function() { abort('You are getting _FORM_SetIndexSelected on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_SetIndexSelected', { configurable: true, set: function() { abort('You are setting _FORM_SetIndexSelected on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FORM_IsIndexSelected')) {
        Object.defineProperty(Module['ready'], '_FORM_IsIndexSelected', { configurable: true, get: function() { abort('You are getting _FORM_IsIndexSelected on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FORM_IsIndexSelected', { configurable: true, set: function() { abort('You are setting _FORM_IsIndexSelected on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_LoadXFA')) {
        Object.defineProperty(Module['ready'], '_FPDF_LoadXFA', { configurable: true, get: function() { abort('You are getting _FPDF_LoadXFA on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_LoadXFA', { configurable: true, set: function() { abort('You are setting _FPDF_LoadXFA on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDoc_GetJavaScriptActionCount')) {
        Object.defineProperty(Module['ready'], '_FPDFDoc_GetJavaScriptActionCount', { configurable: true, get: function() { abort('You are getting _FPDFDoc_GetJavaScriptActionCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDoc_GetJavaScriptActionCount', { configurable: true, set: function() { abort('You are setting _FPDFDoc_GetJavaScriptActionCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDoc_GetJavaScriptAction')) {
        Object.defineProperty(Module['ready'], '_FPDFDoc_GetJavaScriptAction', { configurable: true, get: function() { abort('You are getting _FPDFDoc_GetJavaScriptAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDoc_GetJavaScriptAction', { configurable: true, set: function() { abort('You are setting _FPDFDoc_GetJavaScriptAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFDoc_CloseJavaScriptAction')) {
        Object.defineProperty(Module['ready'], '_FPDFDoc_CloseJavaScriptAction', { configurable: true, get: function() { abort('You are getting _FPDFDoc_CloseJavaScriptAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFDoc_CloseJavaScriptAction', { configurable: true, set: function() { abort('You are setting _FPDFDoc_CloseJavaScriptAction on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFJavaScriptAction_GetName')) {
        Object.defineProperty(Module['ready'], '_FPDFJavaScriptAction_GetName', { configurable: true, get: function() { abort('You are getting _FPDFJavaScriptAction_GetName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFJavaScriptAction_GetName', { configurable: true, set: function() { abort('You are setting _FPDFJavaScriptAction_GetName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFJavaScriptAction_GetScript')) {
        Object.defineProperty(Module['ready'], '_FPDFJavaScriptAction_GetScript', { configurable: true, get: function() { abort('You are getting _FPDFJavaScriptAction_GetScript on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFJavaScriptAction_GetScript', { configurable: true, set: function() { abort('You are setting _FPDFJavaScriptAction_GetScript on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_ImportPagesByIndex')) {
        Object.defineProperty(Module['ready'], '_FPDF_ImportPagesByIndex', { configurable: true, get: function() { abort('You are getting _FPDF_ImportPagesByIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_ImportPagesByIndex', { configurable: true, set: function() { abort('You are setting _FPDF_ImportPagesByIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_ImportPages')) {
        Object.defineProperty(Module['ready'], '_FPDF_ImportPages', { configurable: true, get: function() { abort('You are getting _FPDF_ImportPages on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_ImportPages', { configurable: true, set: function() { abort('You are setting _FPDF_ImportPages on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_ImportNPagesToOne')) {
        Object.defineProperty(Module['ready'], '_FPDF_ImportNPagesToOne', { configurable: true, get: function() { abort('You are getting _FPDF_ImportNPagesToOne on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_ImportNPagesToOne', { configurable: true, set: function() { abort('You are setting _FPDF_ImportNPagesToOne on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_NewXObjectFromPage')) {
        Object.defineProperty(Module['ready'], '_FPDF_NewXObjectFromPage', { configurable: true, get: function() { abort('You are getting _FPDF_NewXObjectFromPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_NewXObjectFromPage', { configurable: true, set: function() { abort('You are setting _FPDF_NewXObjectFromPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_CloseXObject')) {
        Object.defineProperty(Module['ready'], '_FPDF_CloseXObject', { configurable: true, get: function() { abort('You are getting _FPDF_CloseXObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_CloseXObject', { configurable: true, set: function() { abort('You are setting _FPDF_CloseXObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_NewFormObjectFromXObject')) {
        Object.defineProperty(Module['ready'], '_FPDF_NewFormObjectFromXObject', { configurable: true, get: function() { abort('You are getting _FPDF_NewFormObjectFromXObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_NewFormObjectFromXObject', { configurable: true, set: function() { abort('You are setting _FPDF_NewFormObjectFromXObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_CopyViewerPreferences')) {
        Object.defineProperty(Module['ready'], '_FPDF_CopyViewerPreferences', { configurable: true, get: function() { abort('You are getting _FPDF_CopyViewerPreferences on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_CopyViewerPreferences', { configurable: true, set: function() { abort('You are setting _FPDF_CopyViewerPreferences on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_RenderPageBitmapWithColorScheme_Start')) {
        Object.defineProperty(Module['ready'], '_FPDF_RenderPageBitmapWithColorScheme_Start', { configurable: true, get: function() { abort('You are getting _FPDF_RenderPageBitmapWithColorScheme_Start on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_RenderPageBitmapWithColorScheme_Start', { configurable: true, set: function() { abort('You are setting _FPDF_RenderPageBitmapWithColorScheme_Start on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_RenderPageBitmap_Start')) {
        Object.defineProperty(Module['ready'], '_FPDF_RenderPageBitmap_Start', { configurable: true, get: function() { abort('You are getting _FPDF_RenderPageBitmap_Start on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_RenderPageBitmap_Start', { configurable: true, set: function() { abort('You are setting _FPDF_RenderPageBitmap_Start on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_RenderPage_Continue')) {
        Object.defineProperty(Module['ready'], '_FPDF_RenderPage_Continue', { configurable: true, get: function() { abort('You are getting _FPDF_RenderPage_Continue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_RenderPage_Continue', { configurable: true, set: function() { abort('You are setting _FPDF_RenderPage_Continue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_RenderPage_Close')) {
        Object.defineProperty(Module['ready'], '_FPDF_RenderPage_Close', { configurable: true, get: function() { abort('You are getting _FPDF_RenderPage_Close on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_RenderPage_Close', { configurable: true, set: function() { abort('You are setting _FPDF_RenderPage_Close on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_SaveAsCopy')) {
        Object.defineProperty(Module['ready'], '_FPDF_SaveAsCopy', { configurable: true, get: function() { abort('You are getting _FPDF_SaveAsCopy on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_SaveAsCopy', { configurable: true, set: function() { abort('You are setting _FPDF_SaveAsCopy on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_SaveWithVersion')) {
        Object.defineProperty(Module['ready'], '_FPDF_SaveWithVersion', { configurable: true, get: function() { abort('You are getting _FPDF_SaveWithVersion on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_SaveWithVersion', { configurable: true, set: function() { abort('You are setting _FPDF_SaveWithVersion on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetCharIndexFromTextIndex')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetCharIndexFromTextIndex', { configurable: true, get: function() { abort('You are getting _FPDFText_GetCharIndexFromTextIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetCharIndexFromTextIndex', { configurable: true, set: function() { abort('You are setting _FPDFText_GetCharIndexFromTextIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetTextIndexFromCharIndex')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetTextIndexFromCharIndex', { configurable: true, get: function() { abort('You are getting _FPDFText_GetTextIndexFromCharIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetTextIndexFromCharIndex', { configurable: true, set: function() { abort('You are setting _FPDFText_GetTextIndexFromCharIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetSignatureCount')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetSignatureCount', { configurable: true, get: function() { abort('You are getting _FPDF_GetSignatureCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetSignatureCount', { configurable: true, set: function() { abort('You are setting _FPDF_GetSignatureCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetSignatureObject')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetSignatureObject', { configurable: true, get: function() { abort('You are getting _FPDF_GetSignatureObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetSignatureObject', { configurable: true, set: function() { abort('You are setting _FPDF_GetSignatureObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFSignatureObj_GetContents')) {
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetContents', { configurable: true, get: function() { abort('You are getting _FPDFSignatureObj_GetContents on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetContents', { configurable: true, set: function() { abort('You are setting _FPDFSignatureObj_GetContents on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFSignatureObj_GetByteRange')) {
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetByteRange', { configurable: true, get: function() { abort('You are getting _FPDFSignatureObj_GetByteRange on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetByteRange', { configurable: true, set: function() { abort('You are setting _FPDFSignatureObj_GetByteRange on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFSignatureObj_GetSubFilter')) {
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetSubFilter', { configurable: true, get: function() { abort('You are getting _FPDFSignatureObj_GetSubFilter on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetSubFilter', { configurable: true, set: function() { abort('You are setting _FPDFSignatureObj_GetSubFilter on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFSignatureObj_GetReason')) {
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetReason', { configurable: true, get: function() { abort('You are getting _FPDFSignatureObj_GetReason on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetReason', { configurable: true, set: function() { abort('You are setting _FPDFSignatureObj_GetReason on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFSignatureObj_GetTime')) {
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetTime', { configurable: true, get: function() { abort('You are getting _FPDFSignatureObj_GetTime on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetTime', { configurable: true, set: function() { abort('You are setting _FPDFSignatureObj_GetTime on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFSignatureObj_GetDocMDPPermission')) {
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetDocMDPPermission', { configurable: true, get: function() { abort('You are getting _FPDFSignatureObj_GetDocMDPPermission on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFSignatureObj_GetDocMDPPermission', { configurable: true, set: function() { abort('You are setting _FPDFSignatureObj_GetDocMDPPermission on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructTree_GetForPage')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructTree_GetForPage', { configurable: true, get: function() { abort('You are getting _FPDF_StructTree_GetForPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructTree_GetForPage', { configurable: true, set: function() { abort('You are setting _FPDF_StructTree_GetForPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructTree_Close')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructTree_Close', { configurable: true, get: function() { abort('You are getting _FPDF_StructTree_Close on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructTree_Close', { configurable: true, set: function() { abort('You are setting _FPDF_StructTree_Close on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructTree_CountChildren')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructTree_CountChildren', { configurable: true, get: function() { abort('You are getting _FPDF_StructTree_CountChildren on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructTree_CountChildren', { configurable: true, set: function() { abort('You are setting _FPDF_StructTree_CountChildren on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructTree_GetChildAtIndex')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructTree_GetChildAtIndex', { configurable: true, get: function() { abort('You are getting _FPDF_StructTree_GetChildAtIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructTree_GetChildAtIndex', { configurable: true, set: function() { abort('You are setting _FPDF_StructTree_GetChildAtIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetAltText')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetAltText', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetAltText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetAltText', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetAltText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetActualText')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetActualText', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetActualText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetActualText', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetActualText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetID')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetID', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetID on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetID', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetID on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetLang')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetLang', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetLang on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetLang', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetLang on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetStringAttribute')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetStringAttribute', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetStringAttribute on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetStringAttribute', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetStringAttribute on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetMarkedContentID')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetMarkedContentID', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetMarkedContentID on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetMarkedContentID', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetMarkedContentID on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetType')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetType', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetType', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetObjType')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetObjType', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetObjType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetObjType', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetObjType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetTitle')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetTitle', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetTitle on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetTitle', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetTitle on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_CountChildren')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_CountChildren', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_CountChildren on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_CountChildren', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_CountChildren on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetChildAtIndex')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetChildAtIndex', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetChildAtIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetChildAtIndex', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetChildAtIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetParent')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetParent', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetParent on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetParent', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetParent on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetAttributeCount')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetAttributeCount', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetAttributeCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetAttributeCount', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetAttributeCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetAttributeAtIndex')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetAttributeAtIndex', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetAttributeAtIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetAttributeAtIndex', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetAttributeAtIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_Attr_GetCount')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetCount', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_Attr_GetCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetCount', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_Attr_GetCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_Attr_GetName')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetName', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_Attr_GetName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetName', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_Attr_GetName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_Attr_GetType')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetType', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_Attr_GetType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetType', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_Attr_GetType on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_Attr_GetBooleanValue')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetBooleanValue', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_Attr_GetBooleanValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetBooleanValue', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_Attr_GetBooleanValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_Attr_GetNumberValue')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetNumberValue', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_Attr_GetNumberValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetNumberValue', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_Attr_GetNumberValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_Attr_GetStringValue')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetStringValue', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_Attr_GetStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetStringValue', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_Attr_GetStringValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_Attr_GetBlobValue')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetBlobValue', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_Attr_GetBlobValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_Attr_GetBlobValue', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_Attr_GetBlobValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetMarkedContentIdCount')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetMarkedContentIdCount', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetMarkedContentIdCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetMarkedContentIdCount', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetMarkedContentIdCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_StructElement_GetMarkedContentIdAtIndex')) {
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetMarkedContentIdAtIndex', { configurable: true, get: function() { abort('You are getting _FPDF_StructElement_GetMarkedContentIdAtIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_StructElement_GetMarkedContentIdAtIndex', { configurable: true, set: function() { abort('You are setting _FPDF_StructElement_GetMarkedContentIdAtIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetDefaultTTFMap')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetDefaultTTFMap', { configurable: true, get: function() { abort('You are getting _FPDF_GetDefaultTTFMap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetDefaultTTFMap', { configurable: true, set: function() { abort('You are setting _FPDF_GetDefaultTTFMap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_AddInstalledFont')) {
        Object.defineProperty(Module['ready'], '_FPDF_AddInstalledFont', { configurable: true, get: function() { abort('You are getting _FPDF_AddInstalledFont on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_AddInstalledFont', { configurable: true, set: function() { abort('You are setting _FPDF_AddInstalledFont on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_SetSystemFontInfo')) {
        Object.defineProperty(Module['ready'], '_FPDF_SetSystemFontInfo', { configurable: true, get: function() { abort('You are getting _FPDF_SetSystemFontInfo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_SetSystemFontInfo', { configurable: true, set: function() { abort('You are setting _FPDF_SetSystemFontInfo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetDefaultSystemFontInfo')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetDefaultSystemFontInfo', { configurable: true, get: function() { abort('You are getting _FPDF_GetDefaultSystemFontInfo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetDefaultSystemFontInfo', { configurable: true, set: function() { abort('You are setting _FPDF_GetDefaultSystemFontInfo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_FreeDefaultSystemFontInfo')) {
        Object.defineProperty(Module['ready'], '_FPDF_FreeDefaultSystemFontInfo', { configurable: true, get: function() { abort('You are getting _FPDF_FreeDefaultSystemFontInfo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_FreeDefaultSystemFontInfo', { configurable: true, set: function() { abort('You are setting _FPDF_FreeDefaultSystemFontInfo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_LoadPage')) {
        Object.defineProperty(Module['ready'], '_FPDFText_LoadPage', { configurable: true, get: function() { abort('You are getting _FPDFText_LoadPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_LoadPage', { configurable: true, set: function() { abort('You are setting _FPDFText_LoadPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_ClosePage')) {
        Object.defineProperty(Module['ready'], '_FPDFText_ClosePage', { configurable: true, get: function() { abort('You are getting _FPDFText_ClosePage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_ClosePage', { configurable: true, set: function() { abort('You are setting _FPDFText_ClosePage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_CountChars')) {
        Object.defineProperty(Module['ready'], '_FPDFText_CountChars', { configurable: true, get: function() { abort('You are getting _FPDFText_CountChars on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_CountChars', { configurable: true, set: function() { abort('You are setting _FPDFText_CountChars on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetUnicode')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetUnicode', { configurable: true, get: function() { abort('You are getting _FPDFText_GetUnicode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetUnicode', { configurable: true, set: function() { abort('You are setting _FPDFText_GetUnicode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetFontSize')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetFontSize', { configurable: true, get: function() { abort('You are getting _FPDFText_GetFontSize on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetFontSize', { configurable: true, set: function() { abort('You are setting _FPDFText_GetFontSize on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetFontInfo')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetFontInfo', { configurable: true, get: function() { abort('You are getting _FPDFText_GetFontInfo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetFontInfo', { configurable: true, set: function() { abort('You are setting _FPDFText_GetFontInfo on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetFontWeight')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetFontWeight', { configurable: true, get: function() { abort('You are getting _FPDFText_GetFontWeight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetFontWeight', { configurable: true, set: function() { abort('You are setting _FPDFText_GetFontWeight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetTextRenderMode')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetTextRenderMode', { configurable: true, get: function() { abort('You are getting _FPDFText_GetTextRenderMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetTextRenderMode', { configurable: true, set: function() { abort('You are setting _FPDFText_GetTextRenderMode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetFillColor')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetFillColor', { configurable: true, get: function() { abort('You are getting _FPDFText_GetFillColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetFillColor', { configurable: true, set: function() { abort('You are setting _FPDFText_GetFillColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetStrokeColor')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetStrokeColor', { configurable: true, get: function() { abort('You are getting _FPDFText_GetStrokeColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetStrokeColor', { configurable: true, set: function() { abort('You are setting _FPDFText_GetStrokeColor on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetCharAngle')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetCharAngle', { configurable: true, get: function() { abort('You are getting _FPDFText_GetCharAngle on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetCharAngle', { configurable: true, set: function() { abort('You are setting _FPDFText_GetCharAngle on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetCharBox')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetCharBox', { configurable: true, get: function() { abort('You are getting _FPDFText_GetCharBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetCharBox', { configurable: true, set: function() { abort('You are setting _FPDFText_GetCharBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetLooseCharBox')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetLooseCharBox', { configurable: true, get: function() { abort('You are getting _FPDFText_GetLooseCharBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetLooseCharBox', { configurable: true, set: function() { abort('You are setting _FPDFText_GetLooseCharBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetMatrix')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetMatrix', { configurable: true, get: function() { abort('You are getting _FPDFText_GetMatrix on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetMatrix', { configurable: true, set: function() { abort('You are setting _FPDFText_GetMatrix on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetCharOrigin')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetCharOrigin', { configurable: true, get: function() { abort('You are getting _FPDFText_GetCharOrigin on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetCharOrigin', { configurable: true, set: function() { abort('You are setting _FPDFText_GetCharOrigin on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetCharIndexAtPos')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetCharIndexAtPos', { configurable: true, get: function() { abort('You are getting _FPDFText_GetCharIndexAtPos on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetCharIndexAtPos', { configurable: true, set: function() { abort('You are setting _FPDFText_GetCharIndexAtPos on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetText')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetText', { configurable: true, get: function() { abort('You are getting _FPDFText_GetText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetText', { configurable: true, set: function() { abort('You are setting _FPDFText_GetText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_CountRects')) {
        Object.defineProperty(Module['ready'], '_FPDFText_CountRects', { configurable: true, get: function() { abort('You are getting _FPDFText_CountRects on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_CountRects', { configurable: true, set: function() { abort('You are setting _FPDFText_CountRects on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetRect')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetRect', { configurable: true, get: function() { abort('You are getting _FPDFText_GetRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetRect', { configurable: true, set: function() { abort('You are setting _FPDFText_GetRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetBoundedText')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetBoundedText', { configurable: true, get: function() { abort('You are getting _FPDFText_GetBoundedText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetBoundedText', { configurable: true, set: function() { abort('You are setting _FPDFText_GetBoundedText on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_FindStart')) {
        Object.defineProperty(Module['ready'], '_FPDFText_FindStart', { configurable: true, get: function() { abort('You are getting _FPDFText_FindStart on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_FindStart', { configurable: true, set: function() { abort('You are setting _FPDFText_FindStart on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_FindNext')) {
        Object.defineProperty(Module['ready'], '_FPDFText_FindNext', { configurable: true, get: function() { abort('You are getting _FPDFText_FindNext on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_FindNext', { configurable: true, set: function() { abort('You are setting _FPDFText_FindNext on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_FindPrev')) {
        Object.defineProperty(Module['ready'], '_FPDFText_FindPrev', { configurable: true, get: function() { abort('You are getting _FPDFText_FindPrev on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_FindPrev', { configurable: true, set: function() { abort('You are setting _FPDFText_FindPrev on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetSchResultIndex')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetSchResultIndex', { configurable: true, get: function() { abort('You are getting _FPDFText_GetSchResultIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetSchResultIndex', { configurable: true, set: function() { abort('You are setting _FPDFText_GetSchResultIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_GetSchCount')) {
        Object.defineProperty(Module['ready'], '_FPDFText_GetSchCount', { configurable: true, get: function() { abort('You are getting _FPDFText_GetSchCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_GetSchCount', { configurable: true, set: function() { abort('You are setting _FPDFText_GetSchCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFText_FindClose')) {
        Object.defineProperty(Module['ready'], '_FPDFText_FindClose', { configurable: true, get: function() { abort('You are getting _FPDFText_FindClose on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFText_FindClose', { configurable: true, set: function() { abort('You are setting _FPDFText_FindClose on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_LoadWebLinks')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_LoadWebLinks', { configurable: true, get: function() { abort('You are getting _FPDFLink_LoadWebLinks on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_LoadWebLinks', { configurable: true, set: function() { abort('You are setting _FPDFLink_LoadWebLinks on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_CountWebLinks')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_CountWebLinks', { configurable: true, get: function() { abort('You are getting _FPDFLink_CountWebLinks on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_CountWebLinks', { configurable: true, set: function() { abort('You are setting _FPDFLink_CountWebLinks on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_GetURL')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_GetURL', { configurable: true, get: function() { abort('You are getting _FPDFLink_GetURL on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_GetURL', { configurable: true, set: function() { abort('You are setting _FPDFLink_GetURL on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_CountRects')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_CountRects', { configurable: true, get: function() { abort('You are getting _FPDFLink_CountRects on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_CountRects', { configurable: true, set: function() { abort('You are setting _FPDFLink_CountRects on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_GetRect')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_GetRect', { configurable: true, get: function() { abort('You are getting _FPDFLink_GetRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_GetRect', { configurable: true, set: function() { abort('You are setting _FPDFLink_GetRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_GetTextRange')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_GetTextRange', { configurable: true, get: function() { abort('You are getting _FPDFLink_GetTextRange on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_GetTextRange', { configurable: true, set: function() { abort('You are setting _FPDFLink_GetTextRange on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFLink_CloseWebLinks')) {
        Object.defineProperty(Module['ready'], '_FPDFLink_CloseWebLinks', { configurable: true, get: function() { abort('You are getting _FPDFLink_CloseWebLinks on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFLink_CloseWebLinks', { configurable: true, set: function() { abort('You are setting _FPDFLink_CloseWebLinks on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetDecodedThumbnailData')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetDecodedThumbnailData', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetDecodedThumbnailData on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetDecodedThumbnailData', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetDecodedThumbnailData on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetRawThumbnailData')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetRawThumbnailData', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetRawThumbnailData on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetRawThumbnailData', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetRawThumbnailData on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetThumbnailAsBitmap')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetThumbnailAsBitmap', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetThumbnailAsBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetThumbnailAsBitmap', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetThumbnailAsBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_SetMediaBox')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_SetMediaBox', { configurable: true, get: function() { abort('You are getting _FPDFPage_SetMediaBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_SetMediaBox', { configurable: true, set: function() { abort('You are setting _FPDFPage_SetMediaBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_SetCropBox')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_SetCropBox', { configurable: true, get: function() { abort('You are getting _FPDFPage_SetCropBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_SetCropBox', { configurable: true, set: function() { abort('You are setting _FPDFPage_SetCropBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_SetBleedBox')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_SetBleedBox', { configurable: true, get: function() { abort('You are getting _FPDFPage_SetBleedBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_SetBleedBox', { configurable: true, set: function() { abort('You are setting _FPDFPage_SetBleedBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_SetTrimBox')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_SetTrimBox', { configurable: true, get: function() { abort('You are getting _FPDFPage_SetTrimBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_SetTrimBox', { configurable: true, set: function() { abort('You are setting _FPDFPage_SetTrimBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_SetArtBox')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_SetArtBox', { configurable: true, get: function() { abort('You are getting _FPDFPage_SetArtBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_SetArtBox', { configurable: true, set: function() { abort('You are setting _FPDFPage_SetArtBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetMediaBox')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetMediaBox', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetMediaBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetMediaBox', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetMediaBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetCropBox')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetCropBox', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetCropBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetCropBox', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetCropBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetBleedBox')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetBleedBox', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetBleedBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetBleedBox', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetBleedBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetTrimBox')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetTrimBox', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetTrimBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetTrimBox', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetTrimBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_GetArtBox')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_GetArtBox', { configurable: true, get: function() { abort('You are getting _FPDFPage_GetArtBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_GetArtBox', { configurable: true, set: function() { abort('You are setting _FPDFPage_GetArtBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_TransFormWithClip')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_TransFormWithClip', { configurable: true, get: function() { abort('You are getting _FPDFPage_TransFormWithClip on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_TransFormWithClip', { configurable: true, set: function() { abort('You are setting _FPDFPage_TransFormWithClip on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_TransformClipPath')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_TransformClipPath', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_TransformClipPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_TransformClipPath', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_TransformClipPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPageObj_GetClipPath')) {
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetClipPath', { configurable: true, get: function() { abort('You are getting _FPDFPageObj_GetClipPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPageObj_GetClipPath', { configurable: true, set: function() { abort('You are setting _FPDFPageObj_GetClipPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFClipPath_CountPaths')) {
        Object.defineProperty(Module['ready'], '_FPDFClipPath_CountPaths', { configurable: true, get: function() { abort('You are getting _FPDFClipPath_CountPaths on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFClipPath_CountPaths', { configurable: true, set: function() { abort('You are setting _FPDFClipPath_CountPaths on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFClipPath_CountPathSegments')) {
        Object.defineProperty(Module['ready'], '_FPDFClipPath_CountPathSegments', { configurable: true, get: function() { abort('You are getting _FPDFClipPath_CountPathSegments on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFClipPath_CountPathSegments', { configurable: true, set: function() { abort('You are setting _FPDFClipPath_CountPathSegments on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFClipPath_GetPathSegment')) {
        Object.defineProperty(Module['ready'], '_FPDFClipPath_GetPathSegment', { configurable: true, get: function() { abort('You are getting _FPDFClipPath_GetPathSegment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFClipPath_GetPathSegment', { configurable: true, set: function() { abort('You are setting _FPDFClipPath_GetPathSegment on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_CreateClipPath')) {
        Object.defineProperty(Module['ready'], '_FPDF_CreateClipPath', { configurable: true, get: function() { abort('You are getting _FPDF_CreateClipPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_CreateClipPath', { configurable: true, set: function() { abort('You are setting _FPDF_CreateClipPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_DestroyClipPath')) {
        Object.defineProperty(Module['ready'], '_FPDF_DestroyClipPath', { configurable: true, get: function() { abort('You are getting _FPDF_DestroyClipPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_DestroyClipPath', { configurable: true, set: function() { abort('You are setting _FPDF_DestroyClipPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFPage_InsertClipPath')) {
        Object.defineProperty(Module['ready'], '_FPDFPage_InsertClipPath', { configurable: true, get: function() { abort('You are getting _FPDFPage_InsertClipPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFPage_InsertClipPath', { configurable: true, set: function() { abort('You are setting _FPDFPage_InsertClipPath on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_InitLibrary')) {
        Object.defineProperty(Module['ready'], '_FPDF_InitLibrary', { configurable: true, get: function() { abort('You are getting _FPDF_InitLibrary on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_InitLibrary', { configurable: true, set: function() { abort('You are setting _FPDF_InitLibrary on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_InitLibraryWithConfig')) {
        Object.defineProperty(Module['ready'], '_FPDF_InitLibraryWithConfig', { configurable: true, get: function() { abort('You are getting _FPDF_InitLibraryWithConfig on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_InitLibraryWithConfig', { configurable: true, set: function() { abort('You are setting _FPDF_InitLibraryWithConfig on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_DestroyLibrary')) {
        Object.defineProperty(Module['ready'], '_FPDF_DestroyLibrary', { configurable: true, get: function() { abort('You are getting _FPDF_DestroyLibrary on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_DestroyLibrary', { configurable: true, set: function() { abort('You are setting _FPDF_DestroyLibrary on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_SetSandBoxPolicy')) {
        Object.defineProperty(Module['ready'], '_FPDF_SetSandBoxPolicy', { configurable: true, get: function() { abort('You are getting _FPDF_SetSandBoxPolicy on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_SetSandBoxPolicy', { configurable: true, set: function() { abort('You are setting _FPDF_SetSandBoxPolicy on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_LoadDocument')) {
        Object.defineProperty(Module['ready'], '_FPDF_LoadDocument', { configurable: true, get: function() { abort('You are getting _FPDF_LoadDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_LoadDocument', { configurable: true, set: function() { abort('You are setting _FPDF_LoadDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_LoadMemDocument')) {
        Object.defineProperty(Module['ready'], '_FPDF_LoadMemDocument', { configurable: true, get: function() { abort('You are getting _FPDF_LoadMemDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_LoadMemDocument', { configurable: true, set: function() { abort('You are setting _FPDF_LoadMemDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_LoadMemDocument64')) {
        Object.defineProperty(Module['ready'], '_FPDF_LoadMemDocument64', { configurable: true, get: function() { abort('You are getting _FPDF_LoadMemDocument64 on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_LoadMemDocument64', { configurable: true, set: function() { abort('You are setting _FPDF_LoadMemDocument64 on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_LoadCustomDocument')) {
        Object.defineProperty(Module['ready'], '_FPDF_LoadCustomDocument', { configurable: true, get: function() { abort('You are getting _FPDF_LoadCustomDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_LoadCustomDocument', { configurable: true, set: function() { abort('You are setting _FPDF_LoadCustomDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetFileVersion')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetFileVersion', { configurable: true, get: function() { abort('You are getting _FPDF_GetFileVersion on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetFileVersion', { configurable: true, set: function() { abort('You are setting _FPDF_GetFileVersion on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetLastError')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetLastError', { configurable: true, get: function() { abort('You are getting _FPDF_GetLastError on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetLastError', { configurable: true, set: function() { abort('You are setting _FPDF_GetLastError on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_DocumentHasValidCrossReferenceTable')) {
        Object.defineProperty(Module['ready'], '_FPDF_DocumentHasValidCrossReferenceTable', { configurable: true, get: function() { abort('You are getting _FPDF_DocumentHasValidCrossReferenceTable on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_DocumentHasValidCrossReferenceTable', { configurable: true, set: function() { abort('You are setting _FPDF_DocumentHasValidCrossReferenceTable on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetTrailerEnds')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetTrailerEnds', { configurable: true, get: function() { abort('You are getting _FPDF_GetTrailerEnds on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetTrailerEnds', { configurable: true, set: function() { abort('You are setting _FPDF_GetTrailerEnds on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetDocPermissions')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetDocPermissions', { configurable: true, get: function() { abort('You are getting _FPDF_GetDocPermissions on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetDocPermissions', { configurable: true, set: function() { abort('You are setting _FPDF_GetDocPermissions on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetSecurityHandlerRevision')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetSecurityHandlerRevision', { configurable: true, get: function() { abort('You are getting _FPDF_GetSecurityHandlerRevision on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetSecurityHandlerRevision', { configurable: true, set: function() { abort('You are setting _FPDF_GetSecurityHandlerRevision on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetPageCount')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetPageCount', { configurable: true, get: function() { abort('You are getting _FPDF_GetPageCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetPageCount', { configurable: true, set: function() { abort('You are setting _FPDF_GetPageCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_LoadPage')) {
        Object.defineProperty(Module['ready'], '_FPDF_LoadPage', { configurable: true, get: function() { abort('You are getting _FPDF_LoadPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_LoadPage', { configurable: true, set: function() { abort('You are setting _FPDF_LoadPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetPageWidthF')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetPageWidthF', { configurable: true, get: function() { abort('You are getting _FPDF_GetPageWidthF on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetPageWidthF', { configurable: true, set: function() { abort('You are setting _FPDF_GetPageWidthF on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetPageWidth')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetPageWidth', { configurable: true, get: function() { abort('You are getting _FPDF_GetPageWidth on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetPageWidth', { configurable: true, set: function() { abort('You are setting _FPDF_GetPageWidth on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetPageHeightF')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetPageHeightF', { configurable: true, get: function() { abort('You are getting _FPDF_GetPageHeightF on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetPageHeightF', { configurable: true, set: function() { abort('You are setting _FPDF_GetPageHeightF on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetPageHeight')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetPageHeight', { configurable: true, get: function() { abort('You are getting _FPDF_GetPageHeight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetPageHeight', { configurable: true, set: function() { abort('You are setting _FPDF_GetPageHeight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetPageBoundingBox')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetPageBoundingBox', { configurable: true, get: function() { abort('You are getting _FPDF_GetPageBoundingBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetPageBoundingBox', { configurable: true, set: function() { abort('You are setting _FPDF_GetPageBoundingBox on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetPageSizeByIndexF')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetPageSizeByIndexF', { configurable: true, get: function() { abort('You are getting _FPDF_GetPageSizeByIndexF on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetPageSizeByIndexF', { configurable: true, set: function() { abort('You are setting _FPDF_GetPageSizeByIndexF on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetPageSizeByIndex')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetPageSizeByIndex', { configurable: true, get: function() { abort('You are getting _FPDF_GetPageSizeByIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetPageSizeByIndex', { configurable: true, set: function() { abort('You are setting _FPDF_GetPageSizeByIndex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_RenderPageBitmap')) {
        Object.defineProperty(Module['ready'], '_FPDF_RenderPageBitmap', { configurable: true, get: function() { abort('You are getting _FPDF_RenderPageBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_RenderPageBitmap', { configurable: true, set: function() { abort('You are setting _FPDF_RenderPageBitmap on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_RenderPageBitmapWithMatrix')) {
        Object.defineProperty(Module['ready'], '_FPDF_RenderPageBitmapWithMatrix', { configurable: true, get: function() { abort('You are getting _FPDF_RenderPageBitmapWithMatrix on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_RenderPageBitmapWithMatrix', { configurable: true, set: function() { abort('You are setting _FPDF_RenderPageBitmapWithMatrix on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_ClosePage')) {
        Object.defineProperty(Module['ready'], '_FPDF_ClosePage', { configurable: true, get: function() { abort('You are getting _FPDF_ClosePage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_ClosePage', { configurable: true, set: function() { abort('You are setting _FPDF_ClosePage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_CloseDocument')) {
        Object.defineProperty(Module['ready'], '_FPDF_CloseDocument', { configurable: true, get: function() { abort('You are getting _FPDF_CloseDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_CloseDocument', { configurable: true, set: function() { abort('You are setting _FPDF_CloseDocument on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_DeviceToPage')) {
        Object.defineProperty(Module['ready'], '_FPDF_DeviceToPage', { configurable: true, get: function() { abort('You are getting _FPDF_DeviceToPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_DeviceToPage', { configurable: true, set: function() { abort('You are setting _FPDF_DeviceToPage on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_PageToDevice')) {
        Object.defineProperty(Module['ready'], '_FPDF_PageToDevice', { configurable: true, get: function() { abort('You are getting _FPDF_PageToDevice on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_PageToDevice', { configurable: true, set: function() { abort('You are setting _FPDF_PageToDevice on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBitmap_Create')) {
        Object.defineProperty(Module['ready'], '_FPDFBitmap_Create', { configurable: true, get: function() { abort('You are getting _FPDFBitmap_Create on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBitmap_Create', { configurable: true, set: function() { abort('You are setting _FPDFBitmap_Create on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBitmap_CreateEx')) {
        Object.defineProperty(Module['ready'], '_FPDFBitmap_CreateEx', { configurable: true, get: function() { abort('You are getting _FPDFBitmap_CreateEx on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBitmap_CreateEx', { configurable: true, set: function() { abort('You are setting _FPDFBitmap_CreateEx on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBitmap_GetFormat')) {
        Object.defineProperty(Module['ready'], '_FPDFBitmap_GetFormat', { configurable: true, get: function() { abort('You are getting _FPDFBitmap_GetFormat on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBitmap_GetFormat', { configurable: true, set: function() { abort('You are setting _FPDFBitmap_GetFormat on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBitmap_FillRect')) {
        Object.defineProperty(Module['ready'], '_FPDFBitmap_FillRect', { configurable: true, get: function() { abort('You are getting _FPDFBitmap_FillRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBitmap_FillRect', { configurable: true, set: function() { abort('You are setting _FPDFBitmap_FillRect on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBitmap_GetBuffer')) {
        Object.defineProperty(Module['ready'], '_FPDFBitmap_GetBuffer', { configurable: true, get: function() { abort('You are getting _FPDFBitmap_GetBuffer on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBitmap_GetBuffer', { configurable: true, set: function() { abort('You are setting _FPDFBitmap_GetBuffer on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBitmap_GetWidth')) {
        Object.defineProperty(Module['ready'], '_FPDFBitmap_GetWidth', { configurable: true, get: function() { abort('You are getting _FPDFBitmap_GetWidth on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBitmap_GetWidth', { configurable: true, set: function() { abort('You are setting _FPDFBitmap_GetWidth on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBitmap_GetHeight')) {
        Object.defineProperty(Module['ready'], '_FPDFBitmap_GetHeight', { configurable: true, get: function() { abort('You are getting _FPDFBitmap_GetHeight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBitmap_GetHeight', { configurable: true, set: function() { abort('You are setting _FPDFBitmap_GetHeight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBitmap_GetStride')) {
        Object.defineProperty(Module['ready'], '_FPDFBitmap_GetStride', { configurable: true, get: function() { abort('You are getting _FPDFBitmap_GetStride on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBitmap_GetStride', { configurable: true, set: function() { abort('You are setting _FPDFBitmap_GetStride on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDFBitmap_Destroy')) {
        Object.defineProperty(Module['ready'], '_FPDFBitmap_Destroy', { configurable: true, get: function() { abort('You are getting _FPDFBitmap_Destroy on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDFBitmap_Destroy', { configurable: true, set: function() { abort('You are setting _FPDFBitmap_Destroy on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_VIEWERREF_GetPrintScaling')) {
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetPrintScaling', { configurable: true, get: function() { abort('You are getting _FPDF_VIEWERREF_GetPrintScaling on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetPrintScaling', { configurable: true, set: function() { abort('You are setting _FPDF_VIEWERREF_GetPrintScaling on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_VIEWERREF_GetNumCopies')) {
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetNumCopies', { configurable: true, get: function() { abort('You are getting _FPDF_VIEWERREF_GetNumCopies on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetNumCopies', { configurable: true, set: function() { abort('You are setting _FPDF_VIEWERREF_GetNumCopies on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_VIEWERREF_GetPrintPageRange')) {
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetPrintPageRange', { configurable: true, get: function() { abort('You are getting _FPDF_VIEWERREF_GetPrintPageRange on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetPrintPageRange', { configurable: true, set: function() { abort('You are setting _FPDF_VIEWERREF_GetPrintPageRange on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_VIEWERREF_GetPrintPageRangeCount')) {
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetPrintPageRangeCount', { configurable: true, get: function() { abort('You are getting _FPDF_VIEWERREF_GetPrintPageRangeCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetPrintPageRangeCount', { configurable: true, set: function() { abort('You are setting _FPDF_VIEWERREF_GetPrintPageRangeCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_VIEWERREF_GetPrintPageRangeElement')) {
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetPrintPageRangeElement', { configurable: true, get: function() { abort('You are getting _FPDF_VIEWERREF_GetPrintPageRangeElement on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetPrintPageRangeElement', { configurable: true, set: function() { abort('You are setting _FPDF_VIEWERREF_GetPrintPageRangeElement on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_VIEWERREF_GetDuplex')) {
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetDuplex', { configurable: true, get: function() { abort('You are getting _FPDF_VIEWERREF_GetDuplex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetDuplex', { configurable: true, set: function() { abort('You are setting _FPDF_VIEWERREF_GetDuplex on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_VIEWERREF_GetName')) {
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetName', { configurable: true, get: function() { abort('You are getting _FPDF_VIEWERREF_GetName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_VIEWERREF_GetName', { configurable: true, set: function() { abort('You are setting _FPDF_VIEWERREF_GetName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_CountNamedDests')) {
        Object.defineProperty(Module['ready'], '_FPDF_CountNamedDests', { configurable: true, get: function() { abort('You are getting _FPDF_CountNamedDests on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_CountNamedDests', { configurable: true, set: function() { abort('You are setting _FPDF_CountNamedDests on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetNamedDestByName')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetNamedDestByName', { configurable: true, get: function() { abort('You are getting _FPDF_GetNamedDestByName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetNamedDestByName', { configurable: true, set: function() { abort('You are setting _FPDF_GetNamedDestByName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetNamedDest')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetNamedDest', { configurable: true, get: function() { abort('You are getting _FPDF_GetNamedDest on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetNamedDest', { configurable: true, set: function() { abort('You are setting _FPDF_GetNamedDest on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetXFAPacketCount')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetXFAPacketCount', { configurable: true, get: function() { abort('You are getting _FPDF_GetXFAPacketCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetXFAPacketCount', { configurable: true, set: function() { abort('You are setting _FPDF_GetXFAPacketCount on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetXFAPacketName')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetXFAPacketName', { configurable: true, get: function() { abort('You are getting _FPDF_GetXFAPacketName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetXFAPacketName', { configurable: true, set: function() { abort('You are setting _FPDF_GetXFAPacketName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_FPDF_GetXFAPacketContent')) {
        Object.defineProperty(Module['ready'], '_FPDF_GetXFAPacketContent', { configurable: true, get: function() { abort('You are getting _FPDF_GetXFAPacketContent on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_FPDF_GetXFAPacketContent', { configurable: true, set: function() { abort('You are setting _FPDF_GetXFAPacketContent on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_emscripten_stack_get_end')) {
        Object.defineProperty(Module['ready'], '_emscripten_stack_get_end', { configurable: true, get: function() { abort('You are getting _emscripten_stack_get_end on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_emscripten_stack_get_end', { configurable: true, set: function() { abort('You are setting _emscripten_stack_get_end on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_emscripten_stack_get_free')) {
        Object.defineProperty(Module['ready'], '_emscripten_stack_get_free', { configurable: true, get: function() { abort('You are getting _emscripten_stack_get_free on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_emscripten_stack_get_free', { configurable: true, set: function() { abort('You are setting _emscripten_stack_get_free on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_emscripten_stack_init')) {
        Object.defineProperty(Module['ready'], '_emscripten_stack_init', { configurable: true, get: function() { abort('You are getting _emscripten_stack_init on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_emscripten_stack_init', { configurable: true, set: function() { abort('You are setting _emscripten_stack_init on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___cxa_demangle')) {
        Object.defineProperty(Module['ready'], '___cxa_demangle', { configurable: true, get: function() { abort('You are getting ___cxa_demangle on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '___cxa_demangle', { configurable: true, set: function() { abort('You are setting ___cxa_demangle on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_stackSave')) {
        Object.defineProperty(Module['ready'], '_stackSave', { configurable: true, get: function() { abort('You are getting _stackSave on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_stackSave', { configurable: true, set: function() { abort('You are setting _stackSave on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_stackRestore')) {
        Object.defineProperty(Module['ready'], '_stackRestore', { configurable: true, get: function() { abort('You are getting _stackRestore on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_stackRestore', { configurable: true, set: function() { abort('You are setting _stackRestore on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_stackAlloc')) {
        Object.defineProperty(Module['ready'], '_stackAlloc', { configurable: true, get: function() { abort('You are getting _stackAlloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_stackAlloc', { configurable: true, set: function() { abort('You are setting _stackAlloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___wasm_call_ctors')) {
        Object.defineProperty(Module['ready'], '___wasm_call_ctors', { configurable: true, get: function() { abort('You are getting ___wasm_call_ctors on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '___wasm_call_ctors', { configurable: true, set: function() { abort('You are setting ___wasm_call_ctors on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_fflush')) {
        Object.defineProperty(Module['ready'], '_fflush', { configurable: true, get: function() { abort('You are getting _fflush on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_fflush', { configurable: true, set: function() { abort('You are setting _fflush on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___errno_location')) {
        Object.defineProperty(Module['ready'], '___errno_location', { configurable: true, get: function() { abort('You are getting ___errno_location on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '___errno_location', { configurable: true, set: function() { abort('You are setting ___errno_location on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_malloc')) {
        Object.defineProperty(Module['ready'], '_malloc', { configurable: true, get: function() { abort('You are getting _malloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_malloc', { configurable: true, set: function() { abort('You are setting _malloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_free')) {
        Object.defineProperty(Module['ready'], '_free', { configurable: true, get: function() { abort('You are getting _free on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_free', { configurable: true, set: function() { abort('You are setting _free on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '__get_tzname')) {
        Object.defineProperty(Module['ready'], '__get_tzname', { configurable: true, get: function() { abort('You are getting __get_tzname on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '__get_tzname', { configurable: true, set: function() { abort('You are setting __get_tzname on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '__get_daylight')) {
        Object.defineProperty(Module['ready'], '__get_daylight', { configurable: true, get: function() { abort('You are getting __get_daylight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '__get_daylight', { configurable: true, set: function() { abort('You are setting __get_daylight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '__get_timezone')) {
        Object.defineProperty(Module['ready'], '__get_timezone', { configurable: true, get: function() { abort('You are getting __get_timezone on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '__get_timezone', { configurable: true, set: function() { abort('You are setting __get_timezone on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_saveSetjmp')) {
        Object.defineProperty(Module['ready'], '_saveSetjmp', { configurable: true, get: function() { abort('You are getting _saveSetjmp on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_saveSetjmp', { configurable: true, set: function() { abort('You are setting _saveSetjmp on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_setThrew')) {
        Object.defineProperty(Module['ready'], '_setThrew', { configurable: true, get: function() { abort('You are getting _setThrew on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_setThrew', { configurable: true, set: function() { abort('You are setting _setThrew on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_emscripten_builtin_malloc')) {
        Object.defineProperty(Module['ready'], '_emscripten_builtin_malloc', { configurable: true, get: function() { abort('You are getting _emscripten_builtin_malloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_emscripten_builtin_malloc', { configurable: true, set: function() { abort('You are setting _emscripten_builtin_malloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_emscripten_builtin_free')) {
        Object.defineProperty(Module['ready'], '_emscripten_builtin_free', { configurable: true, get: function() { abort('You are getting _emscripten_builtin_free on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_emscripten_builtin_free', { configurable: true, set: function() { abort('You are setting _emscripten_builtin_free on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_emscripten_builtin_memalign')) {
        Object.defineProperty(Module['ready'], '_emscripten_builtin_memalign', { configurable: true, get: function() { abort('You are getting _emscripten_builtin_memalign on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_emscripten_builtin_memalign', { configurable: true, set: function() { abort('You are setting _emscripten_builtin_memalign on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_memalign')) {
        Object.defineProperty(Module['ready'], '_memalign', { configurable: true, get: function() { abort('You are getting _memalign on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_memalign', { configurable: true, set: function() { abort('You are setting _memalign on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_memset')) {
        Object.defineProperty(Module['ready'], '_memset', { configurable: true, get: function() { abort('You are getting _memset on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_memset', { configurable: true, set: function() { abort('You are setting _memset on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_PDFium_Init')) {
        Object.defineProperty(Module['ready'], '_PDFium_Init', { configurable: true, get: function() { abort('You are getting _PDFium_Init on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_PDFium_Init', { configurable: true, set: function() { abort('You are setting _PDFium_Init on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___getTypeName')) {
        Object.defineProperty(Module['ready'], '___getTypeName', { configurable: true, get: function() { abort('You are getting ___getTypeName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '___getTypeName', { configurable: true, set: function() { abort('You are setting ___getTypeName on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___embind_register_native_and_builtin_types')) {
        Object.defineProperty(Module['ready'], '___embind_register_native_and_builtin_types', { configurable: true, get: function() { abort('You are getting ___embind_register_native_and_builtin_types on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '___embind_register_native_and_builtin_types', { configurable: true, set: function() { abort('You are setting ___embind_register_native_and_builtin_types on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], 'onRuntimeInitialized')) {
        Object.defineProperty(Module['ready'], 'onRuntimeInitialized', { configurable: true, get: function() { abort('You are getting onRuntimeInitialized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], 'onRuntimeInitialized', { configurable: true, set: function() { abort('You are setting onRuntimeInitialized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// {{PRE_JSES}}

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = function(status, toThrow) {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === 'object';
ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)');
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

var nodeFS;
var nodePath;

if (ENVIRONMENT_IS_NODE) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = require('path').dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }

// include: node_shell_read.js


read_ = function shell_read(filename, binary) {
  if (!nodeFS) nodeFS = require('fs');
  if (!nodePath) nodePath = require('path');
  filename = nodePath['normalize'](filename);
  return nodeFS['readFileSync'](filename, binary ? null : 'utf8');
};

readBinary = function readBinary(filename) {
  var ret = read_(filename, true);
  if (!ret.buffer) {
    ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
};

// end include: node_shell_read.js
  if (process['argv'].length > 1) {
    thisProgram = process['argv'][1].replace(/\\/g, '/');
  }

  arguments_ = process['argv'].slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  process['on']('unhandledRejection', abort);

  quit_ = function(status) {
    process['exit'](status);
  };

  Module['inspect'] = function () { return '[Emscripten Module object]'; };

} else
if (ENVIRONMENT_IS_SHELL) {

  if (typeof read != 'undefined') {
    read_ = function shell_read(f) {
      return read(f);
    };
  }

  readBinary = function readBinary(f) {
    var data;
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit === 'function') {
    quit_ = function(status) {
      quit(status);
    };
  }

  if (typeof print !== 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console === 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr !== 'undefined' ? printErr : print);
  }

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document !== 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptDir) {
    scriptDirectory = _scriptDir;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {

// include: web_or_worker_shell_read.js


  read_ = function(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
  };

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = function(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = function(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };

// end include: web_or_worker_shell_read.js
  }

  setWindowTitle = function(title) { document.title = title };
} else
{
  throw new Error('environment detection error');
}

// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.warn.bind(console);

// Merge back in the overrides
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];
if (!Object.getOwnPropertyDescriptor(Module, 'arguments')) {
  Object.defineProperty(Module, 'arguments', {
    configurable: true,
    get: function() {
      abort('Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)')
    }
  });
}

if (Module['thisProgram']) thisProgram = Module['thisProgram'];
if (!Object.getOwnPropertyDescriptor(Module, 'thisProgram')) {
  Object.defineProperty(Module, 'thisProgram', {
    configurable: true,
    get: function() {
      abort('Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)')
    }
  });
}

if (Module['quit']) quit_ = Module['quit'];
if (!Object.getOwnPropertyDescriptor(Module, 'quit')) {
  Object.defineProperty(Module, 'quit', {
    configurable: true,
    get: function() {
      abort('Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)')
    }
  });
}

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] === 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] === 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] === 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] === 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] === 'undefined', 'Module.read option was removed (modify read_ in JS)');
assert(typeof Module['readAsync'] === 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] === 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] === 'undefined', 'Module.setWindowTitle option was removed (modify setWindowTitle in JS)');
assert(typeof Module['TOTAL_MEMORY'] === 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');

if (!Object.getOwnPropertyDescriptor(Module, 'read')) {
  Object.defineProperty(Module, 'read', {
    configurable: true,
    get: function() {
      abort('Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)')
    }
  });
}

if (!Object.getOwnPropertyDescriptor(Module, 'readAsync')) {
  Object.defineProperty(Module, 'readAsync', {
    configurable: true,
    get: function() {
      abort('Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)')
    }
  });
}

if (!Object.getOwnPropertyDescriptor(Module, 'readBinary')) {
  Object.defineProperty(Module, 'readBinary', {
    configurable: true,
    get: function() {
      abort('Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)')
    }
  });
}

if (!Object.getOwnPropertyDescriptor(Module, 'setWindowTitle')) {
  Object.defineProperty(Module, 'setWindowTitle', {
    configurable: true,
    get: function() {
      abort('Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)')
    }
  });
}
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';




var STACK_ALIGN = 16;

function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
  return Math.ceil(size / factor) * factor;
}

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length-1] === '*') {
        return 4; // A pointer
      } else if (type[0] === 'i') {
        var bits = Number(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}

// include: runtime_functions.js


// Wraps a JS function as a wasm function with a given signature.
function convertJsFunctionToWasm(func, sig) {

  // If the type reflection proposal is available, use the new
  // "WebAssembly.Function" constructor.
  // Otherwise, construct a minimal wasm module importing the JS function and
  // re-exporting it.
  if (typeof WebAssembly.Function === "function") {
    var typeNames = {
      'i': 'i32',
      'j': 'i64',
      'f': 'f32',
      'd': 'f64'
    };
    var type = {
      parameters: [],
      results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
    };
    for (var i = 1; i < sig.length; ++i) {
      type.parameters.push(typeNames[sig[i]]);
    }
    return new WebAssembly.Function(type, func);
  }

  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    'e': {
      'f': func
    }
  });
  var wrappedFunc = instance.exports['f'];
  return wrappedFunc;
}

var freeTableIndexes = [];

// Weak map of functions in the table to their indexes, created on first use.
var functionsInTableMap;

function getEmptyTableSlot() {
  // Reuse a free index if there is one, otherwise grow.
  if (freeTableIndexes.length) {
    return freeTableIndexes.pop();
  }
  // Grow the table
  try {
    wasmTable.grow(1);
  } catch (err) {
    if (!(err instanceof RangeError)) {
      throw err;
    }
    throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
  }
  return wasmTable.length - 1;
}

// Add a wasm function to the table.
function addFunctionWasm(func, sig) {
  // Check if the function is already in the table, to ensure each function
  // gets a unique index. First, create the map if this is the first use.
  if (!functionsInTableMap) {
    functionsInTableMap = new WeakMap();
    for (var i = 0; i < wasmTable.length; i++) {
      var item = wasmTable.get(i);
      // Ignore null values.
      if (item) {
        functionsInTableMap.set(item, i);
      }
    }
  }
  if (functionsInTableMap.has(func)) {
    return functionsInTableMap.get(func);
  }

  // It's not in the table, add it now.

  var ret = getEmptyTableSlot();

  // Set the new value.
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    wasmTable.set(ret, func);
  } catch (err) {
    if (!(err instanceof TypeError)) {
      throw err;
    }
    assert(typeof sig !== 'undefined', 'Missing signature argument to addFunction: ' + func);
    var wrapped = convertJsFunctionToWasm(func, sig);
    wasmTable.set(ret, wrapped);
  }

  functionsInTableMap.set(func, ret);

  return ret;
}

function removeFunction(index) {
  functionsInTableMap.delete(wasmTable.get(index));
  freeTableIndexes.push(index);
}

// 'sig' parameter is required for the llvm backend but only when func is not
// already a WebAssembly function.
function addFunction(func, sig) {
  assert(typeof func !== 'undefined');

  return addFunctionWasm(func, sig);
}

// end include: runtime_functions.js
// include: runtime_debug.js


// end include: runtime_debug.js
var tempRet0 = 0;

var setTempRet0 = function(value) {
  tempRet0 = value;
};

var getTempRet0 = function() {
  return tempRet0;
};



// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
if (!Object.getOwnPropertyDescriptor(Module, 'wasmBinary')) {
  Object.defineProperty(Module, 'wasmBinary', {
    configurable: true,
    get: function() {
      abort('Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)')
    }
  });
}
var noExitRuntime = Module['noExitRuntime'] || true;
if (!Object.getOwnPropertyDescriptor(Module, 'noExitRuntime')) {
  Object.defineProperty(Module, 'noExitRuntime', {
    configurable: true,
    get: function() {
      abort('Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)')
    }
  });
}

if (typeof WebAssembly !== 'object') {
  abort('no native wasm support detected');
}

// include: runtime_safe_heap.js


// In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
// In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)

/** @param {number} ptr
    @param {number} value
    @param {string} type
    @param {number|boolean=} noSafe */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch (type) {
      case 'i1': HEAP8[((ptr)>>0)] = value; break;
      case 'i8': HEAP8[((ptr)>>0)] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)] = tempI64[0],HEAP32[(((ptr)+(4))>>2)] = tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

/** @param {number} ptr
    @param {string} type
    @param {number|boolean=} noSafe */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch (type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}

// end include: runtime_safe_heap.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
/** @param {string|null=} returnType
    @param {Array=} argTypes
    @param {Arguments|Array=} args
    @param {Object=} opts */
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  assert(returnType !== 'array', 'Return type should not be "array".');
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);

  ret = convertReturnValue(ret);
  if (stack !== 0) stackRestore(stack);
  return ret;
}

/** @param {string=} returnType
    @param {Array=} argTypes
    @param {Object=} opts */
function cwrap(ident, returnType, argTypes, opts) {
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((Uint8Array|Array<number>), number)} */
function allocate(slab, allocator) {
  var ret;
  assert(typeof allocator === 'number', 'allocate no longer takes a type argument')
  assert(typeof slab !== 'number', 'allocate no longer takes a number as arg0')

  if (allocator == ALLOC_STACK) {
    ret = stackAlloc(slab.length);
  } else {
    ret = _malloc(slab.length);
  }

  if (slab.subarray || slab.slice) {
    HEAPU8.set(/** @type {!Uint8Array} */(slab), ret);
  } else {
    HEAPU8.set(new Uint8Array(slab), ret);
  }
  return ret;
}

// include: runtime_strings.js


// runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

/**
 * @param {number} idx
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ArrayToString(heap, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
  while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

  if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(heap.subarray(idx, endPtr));
  } else {
    var str = '';
    // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = heap[idx++];
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      var u1 = heap[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      var u2 = heap[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte 0x' + u0.toString(16) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
      }

      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
  return str;
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 * @param {number} ptr
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   heap: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array.
//                    This count should include the null terminator,
//                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) {
      var u1 = str.charCodeAt(++i);
      u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
    }
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 0xC0 | (u >> 6);
      heap[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 0xE0 | (u >> 12);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      if (u >= 0x200000) warnOnce('Invalid Unicode code point 0x' + u.toString(16) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x1FFFFF).');
      heap[outIdx++] = 0xF0 | (u >> 18);
      heap[outIdx++] = 0x80 | ((u >> 12) & 63);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  heap[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) ++len;
    else if (u <= 0x7FF) len += 2;
    else if (u <= 0xFFFF) len += 3;
    else len += 4;
  }
  return len;
}

// end include: runtime_strings.js
// include: runtime_strings_extra.js


// runtime_strings_extra.js: Strings related runtime functions that are available only in regular runtime.

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAPU8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
  assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  var maxIdx = idx + maxBytesToRead / 2;
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var str = '';

    // If maxBytesToRead is not passed explicitly, it will be undefined, and the for-loop's condition
    // will always evaluate to true. The loop is then terminated on the first null char.
    for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0) break;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }

    return str;
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)] = codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)] = 0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr, maxBytesToRead) {
  assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
  var i = 0;

  var str = '';
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0) break;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
  return str;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)] = codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)] = 0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated
    @param {boolean=} dontAddNull */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
  HEAP8.set(array, buffer);
}

/** @param {boolean=} dontAddNull */
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[((buffer++)>>0)] = str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)] = 0;
}

// end include: runtime_strings_extra.js
// Memory management

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  Module['HEAP8'] = HEAP8 = new Int8Array(buf);
  Module['HEAP16'] = HEAP16 = new Int16Array(buf);
  Module['HEAP32'] = HEAP32 = new Int32Array(buf);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
}

var TOTAL_STACK = 5242880;
if (Module['TOTAL_STACK']) assert(TOTAL_STACK === Module['TOTAL_STACK'], 'the stack size can no longer be determined at runtime')

var INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 16777216;
if (!Object.getOwnPropertyDescriptor(Module, 'INITIAL_MEMORY')) {
  Object.defineProperty(Module, 'INITIAL_MEMORY', {
    configurable: true,
    get: function() {
      abort('Module.INITIAL_MEMORY has been replaced with plain INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)')
    }
  });
}

assert(INITIAL_MEMORY >= TOTAL_STACK, 'INITIAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it.
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -s IMPORTED_MEMORY to define wasmMemory externally');
assert(INITIAL_MEMORY == 16777216, 'Detected runtime INITIAL_MEMORY setting.  Use -s IMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_init_table.js
// In regular non-RELOCATABLE mode the table is exported
// from the wasm module and this will be assigned once
// the exports are available.
var wasmTable;

// end include: runtime_init_table.js
// include: runtime_stack_check.js


// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // The stack grows downwards
  HEAPU32[(max >> 2)+1] = 0x2135467;
  HEAPU32[(max >> 2)+2] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAP32[0] = 0x63736d65; /* 'emsc' */
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  var cookie1 = HEAPU32[(max >> 2)+1];
  var cookie2 = HEAPU32[(max >> 2)+2];
  if (cookie1 != 0x2135467 || cookie2 != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x' + cookie2.toString(16) + ' ' + cookie1.toString(16));
  }
  // Also test the global address 0 for integrity.
  if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
}

// end include: runtime_stack_check.js
// include: runtime_assertions.js


// Endianness check
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -s SUPPORT_BIG_ENDIAN=1 to bypass)';
})();

// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;

function preRun() {

  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  checkStackCookie();
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  
if (!Module["noFSInit"] && !FS.init.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function exitRuntime() {
  checkStackCookie();
  runtimeExited = true;
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');

// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err('dependency: ' + dep);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data

/** @param {string|number=} what */
function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  what += '';
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  var output = 'abort(' + what + ') at ' + stackTrace();
  what = output;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// {{MEM_INITIALIZER}}

// include: memoryprofiler.js


// end include: memoryprofiler.js
// include: URIUtils.js


// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  // Prefix of data URIs emitted by SINGLE_FILE and related options.
  return filename.startsWith(dataURIPrefix);
}

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return filename.startsWith('file://');
}

// end include: URIUtils.js
function createExportWrapper(name, fixedasm) {
  return function() {
    var displayName = name;
    var asm = fixedasm;
    if (!fixedasm) {
      asm = Module['asm'];
    }
    assert(runtimeInitialized, 'native function `' + displayName + '` called before runtime initialization');
    assert(!runtimeExited, 'native function `' + displayName + '` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    if (!asm[name]) {
      assert(asm[name], 'exported native function `' + displayName + '` not found');
    }
    return asm[name].apply(null, arguments);
  };
}

var wasmBinaryFile;
if (Module['locateFile']) {
  wasmBinaryFile = 'pdfium.wasm';
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }
} else {
  // Use bundler-friendly `new URL(..., import.meta.url)` pattern; works in browsers too.
  wasmBinaryFile = new URL('pdfium.wasm', import.meta.url).toString();
}

function getBinary(file) {
  try {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    if (readBinary) {
      return readBinary(file);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // If we don't have the binary yet, try to to load it asynchronously.
  // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
  // See https://github.com/github/fetch/pull/92#issuecomment-140665932
  // Cordova or Electron apps are typically loaded from a file:// url.
  // So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch === 'function'
      && !isFileURI(wasmBinaryFile)
    ) {
      return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
        if (!response['ok']) {
          throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
        }
        return response['arrayBuffer']();
      }).catch(function () {
          return getBinary(wasmBinaryFile);
      });
    }
    else {
      if (readAsync) {
        // fetch is not available or url is file => try XHR (readAsync uses XHR internally)
        return new Promise(function(resolve, reject) {
          readAsync(wasmBinaryFile, function(response) { resolve(new Uint8Array(/** @type{!ArrayBuffer} */(response))) }, reject)
        });
      }
    }
  }

  // Otherwise, getBinary should be able to get it synchronously
  return Promise.resolve().then(function() { return getBinary(wasmBinaryFile); });
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg,
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;

    Module['asm'] = exports;

    wasmMemory = Module['asm']['memory'];
    assert(wasmMemory, "memory not found in wasm exports");
    // This assertion doesn't hold when emscripten is run in --post-link
    // mode.
    // TODO(sbc): Read INITIAL_MEMORY out of the wasm file in post-link mode.
    //assert(wasmMemory.buffer.byteLength === 16777216);
    updateGlobalBufferAndViews(wasmMemory.buffer);

    wasmTable = Module['asm']['__indirect_function_table'];
    assert(wasmTable, "table not found in wasm exports");

    addOnInit(Module['asm']['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
  }
  // we can't run yet (except in a pthread, where we have a custom sync instantiator)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise().then(function(binary) {
      var result = WebAssembly.instantiate(binary, info);
      return result;
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);

      // Warn on some common problems.
      if (isFileURI(wasmBinaryFile)) {
        err('warning: Loading from a file URI (' + wasmBinaryFile + ') is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing');
      }
      abort(reason);
    });
  }

  function instantiateAsync() {
    if (!wasmBinary &&
        typeof WebAssembly.instantiateStreaming === 'function' &&
        !isDataURI(wasmBinaryFile) &&
        // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
        !isFileURI(wasmBinaryFile) &&
        typeof fetch === 'function') {
      return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
        var result = WebAssembly.instantiateStreaming(response, info);
        return result.then(receiveInstantiationResult, function(reason) {
            // We expect the most common failure cause to be a bad MIME type for the binary,
            // in which case falling back to ArrayBuffer instantiation should work.
            err('wasm streaming compile failed: ' + reason);
            err('falling back to ArrayBuffer instantiation');
            return instantiateArrayBuffer(receiveInstantiationResult);
          });
      });
    } else {
      return instantiateArrayBuffer(receiveInstantiationResult);
    }
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      var exports = Module['instantiateWasm'](info, receiveInstance);
      return exports;
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

  // If instantiation fails, reject the module ready promise.
  instantiateAsync().catch(readyPromiseReject);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// === Body ===

var ASM_CONSTS = {
  1771724: function() {Module.wasmTable = wasmTable;}
};






  function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == 'function') {
          callback(Module); // Pass the module as the first argument.
          continue;
        }
        var func = callback.func;
        if (typeof func === 'number') {
          if (callback.arg === undefined) {
            wasmTable.get(func)();
          } else {
            wasmTable.get(func)(callback.arg);
          }
        } else {
          func(callback.arg === undefined ? null : callback.arg);
        }
      }
    }

  function demangle(func) {
      // If demangle has failed before, stop demangling any further function names
      // This avoids an infinite recursion with malloc()->abort()->stackTrace()->demangle()->malloc()->...
      demangle.recursionGuard = (demangle.recursionGuard|0)+1;
      if (demangle.recursionGuard > 1) return func;
      var __cxa_demangle_func = Module['___cxa_demangle'] || Module['__cxa_demangle'];
      assert(__cxa_demangle_func);
      var stackTop = stackSave();
      try {
        var s = func;
        if (s.startsWith('__Z'))
          s = s.substr(1);
        var len = lengthBytesUTF8(s)+1;
        var buf = stackAlloc(len);
        stringToUTF8(s, buf, len);
        var status = stackAlloc(4);
        var ret = __cxa_demangle_func(buf, 0, 0, status);
        if (HEAP32[((status)>>2)] === 0 && ret) {
          return UTF8ToString(ret);
        }
        // otherwise, libcxxabi failed
      } catch(e) {
      } finally {
        _free(ret);
        stackRestore(stackTop);
        if (demangle.recursionGuard < 2) --demangle.recursionGuard;
      }
      // failure when using libcxxabi, don't demangle
      return func;
    }

  function demangleAll(text) {
      var regex =
        /\b_Z[\w\d_]+/g;
      return text.replace(regex,
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }

  function jsStackTrace() {
      var error = new Error();
      if (!error.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error();
        } catch(e) {
          error = e;
        }
        if (!error.stack) {
          return '(no stack trace available)';
        }
      }
      return error.stack.toString();
    }

  var runtimeKeepaliveCounter=0;
  function keepRuntimeAlive() {
      return noExitRuntime || runtimeKeepaliveCounter > 0;
    }

  function stackTrace() {
      var js = jsStackTrace();
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
      return demangleAll(js);
    }

  function ___assert_fail(condition, filename, line, func) {
      abort('Assertion failed: ' + UTF8ToString(condition) + ', at: ' + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    }

  function _atexit(func, arg) {
    }
  function ___cxa_atexit(a0,a1
  ) {
  return _atexit(a0,a1);
  }

  function _gmtime_r(time, tmPtr) {
      var date = new Date(HEAP32[((time)>>2)]*1000);
      HEAP32[((tmPtr)>>2)] = date.getUTCSeconds();
      HEAP32[(((tmPtr)+(4))>>2)] = date.getUTCMinutes();
      HEAP32[(((tmPtr)+(8))>>2)] = date.getUTCHours();
      HEAP32[(((tmPtr)+(12))>>2)] = date.getUTCDate();
      HEAP32[(((tmPtr)+(16))>>2)] = date.getUTCMonth();
      HEAP32[(((tmPtr)+(20))>>2)] = date.getUTCFullYear()-1900;
      HEAP32[(((tmPtr)+(24))>>2)] = date.getUTCDay();
      HEAP32[(((tmPtr)+(36))>>2)] = 0;
      HEAP32[(((tmPtr)+(32))>>2)] = 0;
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = ((date.getTime() - start) / (1000 * 60 * 60 * 24))|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
      // Allocate a string "GMT" for us to point to.
      if (!_gmtime_r.GMTString) _gmtime_r.GMTString = allocateUTF8("GMT");
      HEAP32[(((tmPtr)+(40))>>2)] = _gmtime_r.GMTString;
      return tmPtr;
    }
  function ___gmtime_r(a0,a1
  ) {
  return _gmtime_r(a0,a1);
  }

  function _tzset() {
      // TODO: Use (malleable) environment variables instead of system settings.
      if (_tzset.called) return;
      _tzset.called = true;
  
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
  
      // Local standard timezone offset. Local standard time is not adjusted for daylight savings.
      // This code uses the fact that getTimezoneOffset returns a greater value during Standard Time versus Daylight Saving Time (DST). 
      // Thus it determines the expected output during Standard Time, and it compares whether the output of the given date the same (Standard) or less (DST).
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  
      // timezone is specified as seconds west of UTC ("The external variable
      // `timezone` shall be set to the difference, in seconds, between
      // Coordinated Universal Time (UTC) and local standard time."), the same
      // as returned by stdTimezoneOffset.
      // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
      HEAP32[((__get_timezone())>>2)] = stdTimezoneOffset * 60;
  
      HEAP32[((__get_daylight())>>2)] = Number(winterOffset != summerOffset);
  
      function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
        return match ? match[1] : "GMT";
      };
      var winterName = extractZone(winter);
      var summerName = extractZone(summer);
      var winterNamePtr = allocateUTF8(winterName);
      var summerNamePtr = allocateUTF8(summerName);
      if (summerOffset < winterOffset) {
        // Northern hemisphere
        HEAP32[((__get_tzname())>>2)] = winterNamePtr;
        HEAP32[(((__get_tzname())+(4))>>2)] = summerNamePtr;
      } else {
        HEAP32[((__get_tzname())>>2)] = summerNamePtr;
        HEAP32[(((__get_tzname())+(4))>>2)] = winterNamePtr;
      }
    }
  function _localtime_r(time, tmPtr) {
      _tzset();
      var date = new Date(HEAP32[((time)>>2)]*1000);
      HEAP32[((tmPtr)>>2)] = date.getSeconds();
      HEAP32[(((tmPtr)+(4))>>2)] = date.getMinutes();
      HEAP32[(((tmPtr)+(8))>>2)] = date.getHours();
      HEAP32[(((tmPtr)+(12))>>2)] = date.getDate();
      HEAP32[(((tmPtr)+(16))>>2)] = date.getMonth();
      HEAP32[(((tmPtr)+(20))>>2)] = date.getFullYear()-1900;
      HEAP32[(((tmPtr)+(24))>>2)] = date.getDay();
  
      var start = new Date(date.getFullYear(), 0, 1);
      var yday = ((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
      HEAP32[(((tmPtr)+(36))>>2)] = -(date.getTimezoneOffset() * 60);
  
      // Attention: DST is in December in South, and some regions don't have DST at all.
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset))|0;
      HEAP32[(((tmPtr)+(32))>>2)] = dst;
  
      var zonePtr = HEAP32[(((__get_tzname())+(dst ? 4 : 0))>>2)];
      HEAP32[(((tmPtr)+(40))>>2)] = zonePtr;
  
      return tmPtr;
    }
  function ___localtime_r(a0,a1
  ) {
  return _localtime_r(a0,a1);
  }

  function setErrNo(value) {
      HEAP32[((___errno_location())>>2)] = value;
      return value;
    }
  
  var PATH={splitPath:function(filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function(parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function(path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function(path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function(path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function(path) {
        return PATH.splitPath(path)[3];
      },join:function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function(l, r) {
        return PATH.normalize(l + '/' + r);
      }};
  
  function getRandomDevice() {
      if (typeof crypto === 'object' && typeof crypto['getRandomValues'] === 'function') {
        // for modern web browsers
        var randomBuffer = new Uint8Array(1);
        return function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
      } else
      if (ENVIRONMENT_IS_NODE) {
        // for nodejs with or without crypto support included
        try {
          var crypto_module = require('crypto');
          // nodejs has crypto support
          return function() { return crypto_module['randomBytes'](1)[0]; };
        } catch (e) {
          // nodejs doesn't have crypto support
        }
      }
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      return function() { abort("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };"); };
    }
  
  var PATH_FS={resolve:function() {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function(from, to) {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function(stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },flush:function(stream) {
          stream.tty.ops.flush(stream.tty);
        },read:function(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function(tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
              var bytesRead = 0;
  
              try {
                bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
              } catch(e) {
                // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                if (e.toString().includes('EOF')) bytesRead = 0;
                else throw e;
              }
  
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
            } else
            if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  
  function mmapAlloc(size) {
      var alignedSize = alignMemory(size, 65536);
      var ptr = _malloc(alignedSize);
      while (size < alignedSize) HEAP8[ptr + size++] = 0;
      return ptr;
    }
  var MEMFS={ops_table:null,mount:function(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },getFileDataAsTypedArray:function(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },resizeFileStorage:function(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },node_ops:{getattr:function(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function(parent, name) {
          throw FS.genericErrors[44];
        },mknod:function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
          old_node.parent = new_dir;
        },unlink:function(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },rmdir:function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },readdir:function(node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }},stream_ops:{read:function(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
          // If the buffer is located in main memory (HEAP), and if
          // memory can grow, we can't hold on to references of the
          // memory buffer, as they may get invalidated. That means we
          // need to do copy its contents.
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },llseek:function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },allocate:function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function(stream, address, length, position, prot, flags) {
          if (address !== 0) {
            // We don't currently support location hints for the address of the mapping
            throw new FS.ErrnoError(28);
          }
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents.buffer === buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function(stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (mmapFlags & 2) {
            // MAP_PRIVATE calls need not to be synced back to underlying fs
            return 0;
          }
  
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  var ERRNO_MESSAGES={0:"Success",1:"Arg list too long",2:"Permission denied",3:"Address already in use",4:"Address not available",5:"Address family not supported by protocol family",6:"No more processes",7:"Socket already connected",8:"Bad file number",9:"Trying to read unreadable message",10:"Mount device busy",11:"Operation canceled",12:"No children",13:"Connection aborted",14:"Connection refused",15:"Connection reset by peer",16:"File locking deadlock error",17:"Destination address required",18:"Math arg out of domain of func",19:"Quota exceeded",20:"File exists",21:"Bad address",22:"File too large",23:"Host is unreachable",24:"Identifier removed",25:"Illegal byte sequence",26:"Connection already in progress",27:"Interrupted system call",28:"Invalid argument",29:"I/O error",30:"Socket is already connected",31:"Is a directory",32:"Too many symbolic links",33:"Too many open files",34:"Too many links",35:"Message too long",36:"Multihop attempted",37:"File or path name too long",38:"Network interface is not configured",39:"Connection reset by network",40:"Network is unreachable",41:"Too many open files in system",42:"No buffer space available",43:"No such device",44:"No such file or directory",45:"Exec format error",46:"No record locks available",47:"The link has been severed",48:"Not enough core",49:"No message of desired type",50:"Protocol not available",51:"No space left on device",52:"Function not implemented",53:"Socket is not connected",54:"Not a directory",55:"Directory not empty",56:"State not recoverable",57:"Socket operation on non-socket",59:"Not a typewriter",60:"No such device or address",61:"Value too large for defined data type",62:"Previous owner died",63:"Not super-user",64:"Broken pipe",65:"Protocol error",66:"Unknown protocol",67:"Protocol wrong type for socket",68:"Math result not representable",69:"Read only file system",70:"Illegal seek",71:"No such process",72:"Stale file handle",73:"Connection timed out",74:"Text file busy",75:"Cross-device link",100:"Device not a stream",101:"Bad font file fmt",102:"Invalid slot",103:"Invalid request code",104:"No anode",105:"Block device required",106:"Channel number out of range",107:"Level 3 halted",108:"Level 3 reset",109:"Link number out of range",110:"Protocol driver not attached",111:"No CSI structure available",112:"Level 2 halted",113:"Invalid exchange",114:"Invalid request descriptor",115:"Exchange full",116:"No data (for no delay io)",117:"Timer expired",118:"Out of streams resources",119:"Machine is not on the network",120:"Package not installed",121:"The object is remote",122:"Advertise error",123:"Srmount error",124:"Communication error on send",125:"Cross mount point (not really error)",126:"Given log. name not unique",127:"f.d. invalid for this operation",128:"Remote address changed",129:"Can   access a needed shared lib",130:"Accessing a corrupted shared lib",131:".lib section in a.out corrupted",132:"Attempting to link in too many libs",133:"Attempting to exec a shared library",135:"Streams pipe error",136:"Too many users",137:"Socket type not supported",138:"Not supported",139:"Protocol family not supported",140:"Can't send after socket shutdown",141:"Too many references",142:"Host is down",148:"No medium (in tape drive)",156:"Level 2 not synchronized"};
  
  var ERRNO_CODES={EPERM:63,ENOENT:44,ESRCH:71,EINTR:27,EIO:29,ENXIO:60,E2BIG:1,ENOEXEC:45,EBADF:8,ECHILD:12,EAGAIN:6,EWOULDBLOCK:6,ENOMEM:48,EACCES:2,EFAULT:21,ENOTBLK:105,EBUSY:10,EEXIST:20,EXDEV:75,ENODEV:43,ENOTDIR:54,EISDIR:31,EINVAL:28,ENFILE:41,EMFILE:33,ENOTTY:59,ETXTBSY:74,EFBIG:22,ENOSPC:51,ESPIPE:70,EROFS:69,EMLINK:34,EPIPE:64,EDOM:18,ERANGE:68,ENOMSG:49,EIDRM:24,ECHRNG:106,EL2NSYNC:156,EL3HLT:107,EL3RST:108,ELNRNG:109,EUNATCH:110,ENOCSI:111,EL2HLT:112,EDEADLK:16,ENOLCK:46,EBADE:113,EBADR:114,EXFULL:115,ENOANO:104,EBADRQC:103,EBADSLT:102,EDEADLOCK:16,EBFONT:101,ENOSTR:100,ENODATA:116,ETIME:117,ENOSR:118,ENONET:119,ENOPKG:120,EREMOTE:121,ENOLINK:47,EADV:122,ESRMNT:123,ECOMM:124,EPROTO:65,EMULTIHOP:36,EDOTDOT:125,EBADMSG:9,ENOTUNIQ:126,EBADFD:127,EREMCHG:128,ELIBACC:129,ELIBBAD:130,ELIBSCN:131,ELIBMAX:132,ELIBEXEC:133,ENOSYS:52,ENOTEMPTY:55,ENAMETOOLONG:37,ELOOP:32,EOPNOTSUPP:138,EPFNOSUPPORT:139,ECONNRESET:15,ENOBUFS:42,EAFNOSUPPORT:5,EPROTOTYPE:67,ENOTSOCK:57,ENOPROTOOPT:50,ESHUTDOWN:140,ECONNREFUSED:14,EADDRINUSE:3,ECONNABORTED:13,ENETUNREACH:40,ENETDOWN:38,ETIMEDOUT:73,EHOSTDOWN:142,EHOSTUNREACH:23,EINPROGRESS:26,EALREADY:7,EDESTADDRREQ:17,EMSGSIZE:35,EPROTONOSUPPORT:66,ESOCKTNOSUPPORT:137,EADDRNOTAVAIL:4,ENETRESET:39,EISCONN:30,ENOTCONN:53,ETOOMANYREFS:141,EUSERS:136,EDQUOT:19,ESTALE:72,ENOTSUP:138,ENOMEDIUM:148,EILSEQ:25,EOVERFLOW:61,ECANCELED:11,ENOTRECOVERABLE:56,EOWNERDEAD:62,ESTRPIPE:135};
  var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,lookupPath:function(path, opts) {
        path = PATH_FS.resolve(FS.cwd(), path);
        opts = opts || {};
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function(parentid, name) {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function(parent, name, mode, rdev) {
        assert(typeof parent === 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function(node) {
        FS.hashRemoveNode(node);
      },isRoot:function(node) {
        return node === node.parent;
      },isMountpoint:function(node) {
        return !!node.mounted;
      },isFile:function(mode) {
        return (mode & 61440) === 32768;
      },isDir:function(mode) {
        return (mode & 61440) === 16384;
      },isLink:function(mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function(mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function(mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function(mode) {
        return (mode & 61440) === 4096;
      },isSocket:function(mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"r+":2,"w":577,"w+":578,"a":1089,"a+":1090},modeStringToFlags:function(str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },mayLookup:function(dir) {
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },mayCreate:function(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },mayOpen:function(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function(fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },getStream:function(fd) {
        return FS.streams[fd];
      },createStream:function(stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */ function(){};
          FS.FSStream.prototype = {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          };
        }
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function(fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function() {
          throw new FS.ErrnoError(70);
        }},major:function(dev) {
        return ((dev) >> 8);
      },minor:function(dev) {
        return ((dev) & 0xff);
      },makedev:function(ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function(dev) {
        return FS.devices[dev];
      },getMounts:function(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function(populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function(type, opts, mountpoint) {
        if (typeof type === 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:function(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },mkdev:function(path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existant directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          err("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          err("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          err("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          err("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },unlink:function(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          err("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          err("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:function(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },lstat:function(path) {
        return FS.stat(path, true);
      },chmod:function(path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function(path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function(fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },chown:function(path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function(fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function(fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },utime:function(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function(path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            err("FS.trackingDelegate error on read file: " + path);
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          err("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },isClosed:function(stream) {
        return stream.fd === null;
      },llseek:function(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:function(stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function(stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          err("FS.trackingDelegate['onWriteToFile']('"+stream.path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function(stream, address, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, address, length, position, prot, flags);
      },msync:function(stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:function(stream) {
        return 0;
      },ioctl:function(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function(path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function(path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data === 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },cwd:function() {
        return FS.currentPath;
      },chdir:function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function(stream, buffer, offset, length, pos) { return length; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device = getRandomDevice();
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:function() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: function() {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: function() { return stream.path } }
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:function() {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function() {
        if (FS.ErrnoError) return;
        FS.ErrnoError = /** @this{Object} */ function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = /** @this{Object} */ function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
  
          // Try to get a maximally helpful stack trace. On Node.js, getting Error.stack
          // now ensures it shows what we want.
          if (this.stack) {
            // Define the stack property for Node.js 4, which otherwise errors on the next line.
            Object.defineProperty(this, "stack", { value: (new Error).stack, writable: true });
            this.stack = demangleAll(this.stack);
          }
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function() {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },init:function(input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function() {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        var fflush = Module['_fflush'];
        if (fflush) fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function(canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },findObject:function(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          return null;
        }
      },analyzePath:function(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createPath:function(parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function(parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function(parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },forceLoadFile:function(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
      },createLazyFile:function(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        /** @constructor */
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = this;
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: /** @this {FSNode} */ function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            FS.forceLoadFile(node);
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          FS.forceLoadFile(node);
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init(); // XXX perhaps this method should move onto Browser?
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency(dep);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function() {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function() {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function(paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          out('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function(paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },absolutePath:function() {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },createFolder:function() {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },createLink:function() {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },joinPath:function() {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },mmapAlloc:function() {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },standardizePath:function() {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      }};
  var SYSCALLS={mappings:{},DEFAULT_POLLMASK:5,umask:511,calculateAt:function(dirfd, path, allowEmpty) {
        if (path[0] === '/') {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = FS.getStream(dirfd);
          if (!dirstream) throw new FS.ErrnoError(8);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },doStat:function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -54;
          }
          throw e;
        }
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = 0;
        HEAP32[(((buf)+(8))>>2)] = stat.ino;
        HEAP32[(((buf)+(12))>>2)] = stat.mode;
        HEAP32[(((buf)+(16))>>2)] = stat.nlink;
        HEAP32[(((buf)+(20))>>2)] = stat.uid;
        HEAP32[(((buf)+(24))>>2)] = stat.gid;
        HEAP32[(((buf)+(28))>>2)] = stat.rdev;
        HEAP32[(((buf)+(32))>>2)] = 0;
        (tempI64 = [stat.size>>>0,(tempDouble=stat.size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(40))>>2)] = tempI64[0],HEAP32[(((buf)+(44))>>2)] = tempI64[1]);
        HEAP32[(((buf)+(48))>>2)] = 4096;
        HEAP32[(((buf)+(52))>>2)] = stat.blocks;
        HEAP32[(((buf)+(56))>>2)] = (stat.atime.getTime() / 1000)|0;
        HEAP32[(((buf)+(60))>>2)] = 0;
        HEAP32[(((buf)+(64))>>2)] = (stat.mtime.getTime() / 1000)|0;
        HEAP32[(((buf)+(68))>>2)] = 0;
        HEAP32[(((buf)+(72))>>2)] = (stat.ctime.getTime() / 1000)|0;
        HEAP32[(((buf)+(76))>>2)] = 0;
        (tempI64 = [stat.ino>>>0,(tempDouble=stat.ino,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(80))>>2)] = tempI64[0],HEAP32[(((buf)+(84))>>2)] = tempI64[1]);
        return 0;
      },doMsync:function(addr, stream, len, flags, offset) {
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },doMkdir:function(path, mode) {
        // remove a trailing slash, if one - /a/b/ has basename of '', but
        // we want to create b in the context of this function
        path = PATH.normalize(path);
        if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
        FS.mkdir(path, mode, 0);
        return 0;
      },doMknod:function(path, mode, dev) {
        // we don't want this in the JS API as it uses mknod to create all nodes.
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default: return -28;
        }
        FS.mknod(path, mode, dev);
        return 0;
      },doReadlink:function(path, buf, bufsize) {
        if (bufsize <= 0) return -28;
        var ret = FS.readlink(path);
  
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf+len];
        stringToUTF8(ret, buf, bufsize+1);
        // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
        // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
        HEAP8[buf+len] = endChar;
  
        return len;
      },doAccess:function(path, amode) {
        if (amode & ~7) {
          // need a valid mode
          return -28;
        }
        var node;
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
        if (!node) {
          return -44;
        }
        var perms = '';
        if (amode & 4) perms += 'r';
        if (amode & 2) perms += 'w';
        if (amode & 1) perms += 'x';
        if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
          return -2;
        }
        return 0;
      },doDup:function(path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },doReadv:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.read(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break; // nothing more to read
        }
        return ret;
      },doWritev:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.write(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
        }
        return ret;
      },varargs:undefined,get:function() {
        assert(SYSCALLS.varargs != undefined);
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },getStreamFromFD:function(fd) {
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
        return stream;
      },get64:function(low, high) {
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      }};
  function ___sys_fcntl64(fd, cmd, varargs) {SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = SYSCALLS.get();
          if (arg < 0) {
            return -28;
          }
          var newStream;
          newStream = FS.open(stream.path, stream.flags, 0, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        case 12:
        /* case 12: Currently in musl F_GETLK64 has same value as F_GETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */ {
          
          var arg = SYSCALLS.get();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 13:
        case 14:
        /* case 13: Currently in musl F_SETLK64 has same value as F_SETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
        /* case 14: Currently in musl F_SETLKW64 has same value as F_SETLKW, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
          
          
          return 0; // Pretend that the locking is successful.
        case 16:
        case 8:
          return -28; // These are for sockets. We don't have them fully implemented yet.
        case 9:
          // musl trusts getown return values, due to a bug where they must be, as they overlap with errors. just return -1 here, so fnctl() returns that, and we set errno ourselves.
          setErrNo(28);
          return -1;
        default: {
          return -28;
        }
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_fstat64(fd, buf) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      return SYSCALLS.doStat(FS.stat, stream.path, buf);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_ftruncate64(fd, zero, low, high) {try {
  
      var length = SYSCALLS.get64(low, high);
      FS.ftruncate(fd, length);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_getdents64(fd, dirp, count) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd)
      if (!stream.getdents) {
        stream.getdents = FS.readdir(stream.path);
      }
  
      var struct_size = 280;
      var pos = 0;
      var off = FS.llseek(stream, 0, 1);
  
      var idx = Math.floor(off / struct_size);
  
      while (idx < stream.getdents.length && pos + struct_size <= count) {
        var id;
        var type;
        var name = stream.getdents[idx];
        if (name[0] === '.') {
          id = 1;
          type = 4; // DT_DIR
        } else {
          var child = FS.lookupNode(stream.node, name);
          id = child.id;
          type = FS.isChrdev(child.mode) ? 2 :  // DT_CHR, character device.
                 FS.isDir(child.mode) ? 4 :     // DT_DIR, directory.
                 FS.isLink(child.mode) ? 10 :   // DT_LNK, symbolic link.
                 8;                             // DT_REG, regular file.
        }
        (tempI64 = [id>>>0,(tempDouble=id,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((dirp + pos)>>2)] = tempI64[0],HEAP32[(((dirp + pos)+(4))>>2)] = tempI64[1]);
        (tempI64 = [(idx + 1) * struct_size>>>0,(tempDouble=(idx + 1) * struct_size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((dirp + pos)+(8))>>2)] = tempI64[0],HEAP32[(((dirp + pos)+(12))>>2)] = tempI64[1]);
        HEAP16[(((dirp + pos)+(16))>>1)] = 280;
        HEAP8[(((dirp + pos)+(18))>>0)] = type;
        stringToUTF8(name, dirp + pos + 19, 256);
        pos += struct_size;
        idx += 1;
      }
      FS.llseek(stream, idx * struct_size, 0);
      return pos;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_getpid() {
      return 42;
    }

  function ___sys_ioctl(fd, op, varargs) {SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509:
        case 21505: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = SYSCALLS.get();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        default: abort('bad ioctl syscall ' + op);
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_madvise1(addr, length, advice) {
      return 0; // advice is welcome, but ignored
    }

  function syscallMmap2(addr, len, prot, flags, fd, off) {
      off <<= 12; // undo pgoffset
      var ptr;
      var allocated = false;
  
      // addr argument must be page aligned if MAP_FIXED flag is set.
      if ((flags & 16) !== 0 && (addr % 65536) !== 0) {
        return -28;
      }
  
      // MAP_ANONYMOUS (aka MAP_ANON) isn't actually defined by POSIX spec,
      // but it is widely used way to allocate memory pages on Linux, BSD and Mac.
      // In this case fd argument is ignored.
      if ((flags & 32) !== 0) {
        ptr = _memalign(65536, len);
        if (!ptr) return -48;
        _memset(ptr, 0, len);
        allocated = true;
      } else {
        var info = FS.getStream(fd);
        if (!info) return -8;
        var res = FS.mmap(info, addr, len, off, prot, flags);
        ptr = res.ptr;
        allocated = res.allocated;
      }
      SYSCALLS.mappings[ptr] = { malloc: ptr, len: len, allocated: allocated, fd: fd, prot: prot, flags: flags, offset: off };
      return ptr;
    }
  function ___sys_mmap2(addr, len, prot, flags, fd, off) {try {
  
      return syscallMmap2(addr, len, prot, flags, fd, off);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_mprotect(addr, len, size) {
      return 0; // let's not and say we did
    }

  function syscallMunmap(addr, len) {
      if ((addr | 0) === -1 || len === 0) {
        return -28;
      }
      // TODO: support unmmap'ing parts of allocations
      var info = SYSCALLS.mappings[addr];
      if (!info) return 0;
      if (len === info.len) {
        var stream = FS.getStream(info.fd);
        if (stream) {
          if (info.prot & 2) {
            SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset);
          }
          FS.munmap(stream);
        }
        SYSCALLS.mappings[addr] = null;
        if (info.allocated) {
          _free(info.malloc);
        }
      }
      return 0;
    }
  function ___sys_munmap(addr, len) {try {
  
      return syscallMunmap(addr, len);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_open(path, flags, varargs) {SYSCALLS.varargs = varargs;
  try {
  
      var pathname = SYSCALLS.getStr(path);
      var mode = varargs ? SYSCALLS.get() : 0;
      var stream = FS.open(pathname, flags, mode);
      return stream.fd;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_rmdir(path) {try {
  
      path = SYSCALLS.getStr(path);
      FS.rmdir(path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_stat64(path, buf) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.stat, path, buf);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_unlink(path) {try {
  
      path = SYSCALLS.getStr(path);
      FS.unlink(path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {}

  function getShiftFromSize(size) {
      switch (size) {
          case 1: return 0;
          case 2: return 1;
          case 4: return 2;
          case 8: return 3;
          default:
              throw new TypeError('Unknown type size: ' + size);
      }
    }
  
  function embind_init_charCodes() {
      var codes = new Array(256);
      for (var i = 0; i < 256; ++i) {
          codes[i] = String.fromCharCode(i);
      }
      embind_charCodes = codes;
    }
  var embind_charCodes=undefined;
  function readLatin1String(ptr) {
      var ret = "";
      var c = ptr;
      while (HEAPU8[c]) {
          ret += embind_charCodes[HEAPU8[c++]];
      }
      return ret;
    }
  
  var awaitingDependencies={};
  
  var registeredTypes={};
  
  var typeDependencies={};
  
  var char_0=48;
  
  var char_9=57;
  function makeLegalFunctionName(name) {
      if (undefined === name) {
          return '_unknown';
      }
      name = name.replace(/[^a-zA-Z0-9_]/g, '$');
      var f = name.charCodeAt(0);
      if (f >= char_0 && f <= char_9) {
          return '_' + name;
      } else {
          return name;
      }
    }
  function createNamedFunction(name, body) {
      name = makeLegalFunctionName(name);
      /*jshint evil:true*/
      return new Function(
          "body",
          "return function " + name + "() {\n" +
          "    \"use strict\";" +
          "    return body.apply(this, arguments);\n" +
          "};\n"
      )(body);
    }
  function extendError(baseErrorType, errorName) {
      var errorClass = createNamedFunction(errorName, function(message) {
          this.name = errorName;
          this.message = message;
  
          var stack = (new Error(message)).stack;
          if (stack !== undefined) {
              this.stack = this.toString() + '\n' +
                  stack.replace(/^Error(:[^\n]*)?\n/, '');
          }
      });
      errorClass.prototype = Object.create(baseErrorType.prototype);
      errorClass.prototype.constructor = errorClass;
      errorClass.prototype.toString = function() {
          if (this.message === undefined) {
              return this.name;
          } else {
              return this.name + ': ' + this.message;
          }
      };
  
      return errorClass;
    }
  var BindingError=undefined;
  function throwBindingError(message) {
      throw new BindingError(message);
    }
  
  var InternalError=undefined;
  function throwInternalError(message) {
      throw new InternalError(message);
    }
  function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
      myTypes.forEach(function(type) {
          typeDependencies[type] = dependentTypes;
      });
  
      function onComplete(typeConverters) {
          var myTypeConverters = getTypeConverters(typeConverters);
          if (myTypeConverters.length !== myTypes.length) {
              throwInternalError('Mismatched type converter count');
          }
          for (var i = 0; i < myTypes.length; ++i) {
              registerType(myTypes[i], myTypeConverters[i]);
          }
      }
  
      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      dependentTypes.forEach(function(dt, i) {
          if (registeredTypes.hasOwnProperty(dt)) {
              typeConverters[i] = registeredTypes[dt];
          } else {
              unregisteredTypes.push(dt);
              if (!awaitingDependencies.hasOwnProperty(dt)) {
                  awaitingDependencies[dt] = [];
              }
              awaitingDependencies[dt].push(function() {
                  typeConverters[i] = registeredTypes[dt];
                  ++registered;
                  if (registered === unregisteredTypes.length) {
                      onComplete(typeConverters);
                  }
              });
          }
      });
      if (0 === unregisteredTypes.length) {
          onComplete(typeConverters);
      }
    }
  /** @param {Object=} options */
  function registerType(rawType, registeredInstance, options) {
      options = options || {};
  
      if (!('argPackAdvance' in registeredInstance)) {
          throw new TypeError('registerType registeredInstance requires argPackAdvance');
      }
  
      var name = registeredInstance.name;
      if (!rawType) {
          throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
          if (options.ignoreDuplicateRegistrations) {
              return;
          } else {
              throwBindingError("Cannot register type '" + name + "' twice");
          }
      }
  
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
  
      if (awaitingDependencies.hasOwnProperty(rawType)) {
          var callbacks = awaitingDependencies[rawType];
          delete awaitingDependencies[rawType];
          callbacks.forEach(function(cb) {
              cb();
          });
      }
    }
  function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
      var shift = getShiftFromSize(size);
  
      name = readLatin1String(name);
      registerType(rawType, {
          name: name,
          'fromWireType': function(wt) {
              // ambiguous emscripten ABI: sometimes return values are
              // true or false, and sometimes integers (0 or 1)
              return !!wt;
          },
          'toWireType': function(destructors, o) {
              return o ? trueValue : falseValue;
          },
          'argPackAdvance': 8,
          'readValueFromPointer': function(pointer) {
              // TODO: if heap is fixed (like in asm.js) this could be executed outside
              var heap;
              if (size === 1) {
                  heap = HEAP8;
              } else if (size === 2) {
                  heap = HEAP16;
              } else if (size === 4) {
                  heap = HEAP32;
              } else {
                  throw new TypeError("Unknown boolean type size: " + name);
              }
              return this['fromWireType'](heap[pointer >> shift]);
          },
          destructorFunction: null, // This type does not need a destructor
      });
    }

  var emval_free_list=[];
  
  var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];
  function __emval_decref(handle) {
      if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
          emval_handle_array[handle] = undefined;
          emval_free_list.push(handle);
      }
    }
  
  function count_emval_handles() {
      var count = 0;
      for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== undefined) {
              ++count;
          }
      }
      return count;
    }
  
  function get_first_emval() {
      for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== undefined) {
              return emval_handle_array[i];
          }
      }
      return null;
    }
  function init_emval() {
      Module['count_emval_handles'] = count_emval_handles;
      Module['get_first_emval'] = get_first_emval;
    }
  function __emval_register(value) {
      switch (value) {
        case undefined :{ return 1; }
        case null :{ return 2; }
        case true :{ return 3; }
        case false :{ return 4; }
        default:{
          var handle = emval_free_list.length ?
              emval_free_list.pop() :
              emval_handle_array.length;
  
          emval_handle_array[handle] = {refcount: 1, value: value};
          return handle;
          }
        }
    }
  
  function simpleReadValueFromPointer(pointer) {
      return this['fromWireType'](HEAPU32[pointer >> 2]);
    }
  function __embind_register_emval(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
          name: name,
          'fromWireType': function(handle) {
              var rv = emval_handle_array[handle].value;
              __emval_decref(handle);
              return rv;
          },
          'toWireType': function(destructors, value) {
              return __emval_register(value);
          },
          'argPackAdvance': 8,
          'readValueFromPointer': simpleReadValueFromPointer,
          destructorFunction: null, // This type does not need a destructor
  
          // TODO: do we need a deleteObject here?  write a test where
          // emval is passed into JS via an interface
      });
    }

  function _embind_repr(v) {
      if (v === null) {
          return 'null';
      }
      var t = typeof v;
      if (t === 'object' || t === 'array' || t === 'function') {
          return v.toString();
      } else {
          return '' + v;
      }
    }
  
  function floatReadValueFromPointer(name, shift) {
      switch (shift) {
          case 2: return function(pointer) {
              return this['fromWireType'](HEAPF32[pointer >> 2]);
          };
          case 3: return function(pointer) {
              return this['fromWireType'](HEAPF64[pointer >> 3]);
          };
          default:
              throw new TypeError("Unknown float type: " + name);
      }
    }
  function __embind_register_float(rawType, name, size) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, {
          name: name,
          'fromWireType': function(value) {
              return value;
          },
          'toWireType': function(destructors, value) {
              // todo: Here we have an opportunity for -O3 level "unsafe" optimizations: we could
              // avoid the following if() and assume value is of proper type.
              if (typeof value !== "number" && typeof value !== "boolean") {
                  throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
              }
              return value;
          },
          'argPackAdvance': 8,
          'readValueFromPointer': floatReadValueFromPointer(name, shift),
          destructorFunction: null, // This type does not need a destructor
      });
    }

  function integerReadValueFromPointer(name, shift, signed) {
      // integers are quite common, so generate very specialized functions
      switch (shift) {
          case 0: return signed ?
              function readS8FromPointer(pointer) { return HEAP8[pointer]; } :
              function readU8FromPointer(pointer) { return HEAPU8[pointer]; };
          case 1: return signed ?
              function readS16FromPointer(pointer) { return HEAP16[pointer >> 1]; } :
              function readU16FromPointer(pointer) { return HEAPU16[pointer >> 1]; };
          case 2: return signed ?
              function readS32FromPointer(pointer) { return HEAP32[pointer >> 2]; } :
              function readU32FromPointer(pointer) { return HEAPU32[pointer >> 2]; };
          default:
              throw new TypeError("Unknown integer type: " + name);
      }
    }
  function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
      name = readLatin1String(name);
      if (maxRange === -1) { // LLVM doesn't have signed and unsigned 32-bit types, so u32 literals come out as 'i32 -1'. Always treat those as max u32.
          maxRange = 4294967295;
      }
  
      var shift = getShiftFromSize(size);
  
      var fromWireType = function(value) {
          return value;
      };
  
      if (minRange === 0) {
          var bitshift = 32 - 8*size;
          fromWireType = function(value) {
              return (value << bitshift) >>> bitshift;
          };
      }
  
      var isUnsignedType = (name.includes('unsigned'));
  
      registerType(primitiveType, {
          name: name,
          'fromWireType': fromWireType,
          'toWireType': function(destructors, value) {
              // todo: Here we have an opportunity for -O3 level "unsafe" optimizations: we could
              // avoid the following two if()s and assume value is of proper type.
              if (typeof value !== "number" && typeof value !== "boolean") {
                  throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
              }
              if (value < minRange || value > maxRange) {
                  throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ', ' + maxRange + ']!');
              }
              return isUnsignedType ? (value >>> 0) : (value | 0);
          },
          'argPackAdvance': 8,
          'readValueFromPointer': integerReadValueFromPointer(name, shift, minRange !== 0),
          destructorFunction: null, // This type does not need a destructor
      });
    }

  function __embind_register_memory_view(rawType, dataTypeIndex, name) {
      var typeMapping = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
      ];
  
      var TA = typeMapping[dataTypeIndex];
  
      function decodeMemoryView(handle) {
          handle = handle >> 2;
          var heap = HEAPU32;
          var size = heap[handle]; // in elements
          var data = heap[handle + 1]; // byte offset into emscripten heap
          return new TA(buffer, data, size);
      }
  
      name = readLatin1String(name);
      registerType(rawType, {
          name: name,
          'fromWireType': decodeMemoryView,
          'argPackAdvance': 8,
          'readValueFromPointer': decodeMemoryView,
      }, {
          ignoreDuplicateRegistrations: true,
      });
    }

  function __embind_register_std_string(rawType, name) {
      name = readLatin1String(name);
      var stdStringIsUTF8
      //process only std::string bindings with UTF8 support, in contrast to e.g. std::basic_string<unsigned char>
      = (name === "std::string");
  
      registerType(rawType, {
          name: name,
          'fromWireType': function(value) {
              var length = HEAPU32[value >> 2];
  
              var str;
              if (stdStringIsUTF8) {
                  var decodeStartPtr = value + 4;
                  // Looping here to support possible embedded '0' bytes
                  for (var i = 0; i <= length; ++i) {
                      var currentBytePtr = value + 4 + i;
                      if (i == length || HEAPU8[currentBytePtr] == 0) {
                          var maxRead = currentBytePtr - decodeStartPtr;
                          var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                          if (str === undefined) {
                              str = stringSegment;
                          } else {
                              str += String.fromCharCode(0);
                              str += stringSegment;
                          }
                          decodeStartPtr = currentBytePtr + 1;
                      }
                  }
              } else {
                  var a = new Array(length);
                  for (var i = 0; i < length; ++i) {
                      a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
                  }
                  str = a.join('');
              }
  
              _free(value);
  
              return str;
          },
          'toWireType': function(destructors, value) {
              if (value instanceof ArrayBuffer) {
                  value = new Uint8Array(value);
              }
  
              var getLength;
              var valueIsOfTypeString = (typeof value === 'string');
  
              if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
                  throwBindingError('Cannot pass non-string to std::string');
              }
              if (stdStringIsUTF8 && valueIsOfTypeString) {
                  getLength = function() {return lengthBytesUTF8(value);};
              } else {
                  getLength = function() {return value.length;};
              }
  
              // assumes 4-byte alignment
              var length = getLength();
              var ptr = _malloc(4 + length + 1);
              HEAPU32[ptr >> 2] = length;
              if (stdStringIsUTF8 && valueIsOfTypeString) {
                  stringToUTF8(value, ptr + 4, length + 1);
              } else {
                  if (valueIsOfTypeString) {
                      for (var i = 0; i < length; ++i) {
                          var charCode = value.charCodeAt(i);
                          if (charCode > 255) {
                              _free(ptr);
                              throwBindingError('String has UTF-16 code units that do not fit in 8 bits');
                          }
                          HEAPU8[ptr + 4 + i] = charCode;
                      }
                  } else {
                      for (var i = 0; i < length; ++i) {
                          HEAPU8[ptr + 4 + i] = value[i];
                      }
                  }
              }
  
              if (destructors !== null) {
                  destructors.push(_free, ptr);
              }
              return ptr;
          },
          'argPackAdvance': 8,
          'readValueFromPointer': simpleReadValueFromPointer,
          destructorFunction: function(ptr) { _free(ptr); },
      });
    }

  function __embind_register_std_wstring(rawType, charSize, name) {
      name = readLatin1String(name);
      var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
      if (charSize === 2) {
          decodeString = UTF16ToString;
          encodeString = stringToUTF16;
          lengthBytesUTF = lengthBytesUTF16;
          getHeap = function() { return HEAPU16; };
          shift = 1;
      } else if (charSize === 4) {
          decodeString = UTF32ToString;
          encodeString = stringToUTF32;
          lengthBytesUTF = lengthBytesUTF32;
          getHeap = function() { return HEAPU32; };
          shift = 2;
      }
      registerType(rawType, {
          name: name,
          'fromWireType': function(value) {
              // Code mostly taken from _embind_register_std_string fromWireType
              var length = HEAPU32[value >> 2];
              var HEAP = getHeap();
              var str;
  
              var decodeStartPtr = value + 4;
              // Looping here to support possible embedded '0' bytes
              for (var i = 0; i <= length; ++i) {
                  var currentBytePtr = value + 4 + i * charSize;
                  if (i == length || HEAP[currentBytePtr >> shift] == 0) {
                      var maxReadBytes = currentBytePtr - decodeStartPtr;
                      var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                      if (str === undefined) {
                          str = stringSegment;
                      } else {
                          str += String.fromCharCode(0);
                          str += stringSegment;
                      }
                      decodeStartPtr = currentBytePtr + charSize;
                  }
              }
  
              _free(value);
  
              return str;
          },
          'toWireType': function(destructors, value) {
              if (!(typeof value === 'string')) {
                  throwBindingError('Cannot pass non-string to C++ string type ' + name);
              }
  
              // assumes 4-byte alignment
              var length = lengthBytesUTF(value);
              var ptr = _malloc(4 + length + charSize);
              HEAPU32[ptr >> 2] = length >> shift;
  
              encodeString(value, ptr + 4, length + charSize);
  
              if (destructors !== null) {
                  destructors.push(_free, ptr);
              }
              return ptr;
          },
          'argPackAdvance': 8,
          'readValueFromPointer': simpleReadValueFromPointer,
          destructorFunction: function(ptr) { _free(ptr); },
      });
    }

  function __embind_register_void(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
          isVoid: true, // void return values can be optimized out sometimes
          name: name,
          'argPackAdvance': 0,
          'fromWireType': function() {
              return undefined;
          },
          'toWireType': function(destructors, o) {
              // TODO: assert if anything else is given?
              return undefined;
          },
      });
    }

  function __emscripten_throw_longjmp() { throw 'longjmp'; }

  function _abort() {
      abort();
    }

  var readAsmConstArgsArray=[];
  function readAsmConstArgs(sigPtr, buf) {
      // Nobody should have mutated _readAsmConstArgsArray underneath us to be something else than an array.
      assert(Array.isArray(readAsmConstArgsArray));
      // The input buffer is allocated on the stack, so it must be stack-aligned.
      assert(buf % 16 == 0);
      readAsmConstArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      buf >>= 2;
      while (ch = HEAPU8[sigPtr++]) {
        assert(ch === 100/*'d'*/ || ch === 102/*'f'*/ || ch === 105 /*'i'*/);
        // A double takes two 32-bit slots, and must also be aligned - the backend
        // will emit padding to avoid that.
        var double = ch < 105;
        if (double && (buf & 1)) buf++;
        readAsmConstArgsArray.push(double ? HEAPF64[buf++ >> 1] : HEAP32[buf]);
        ++buf;
      }
      return readAsmConstArgsArray;
    }
  function _emscripten_asm_const_int(code, sigPtr, argbuf) {
      var args = readAsmConstArgs(sigPtr, argbuf);
      if (!ASM_CONSTS.hasOwnProperty(code)) abort('No EM_ASM constant found at address ' + code);
      return ASM_CONSTS[code].apply(null, args);
    }

  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }

  function emscripten_realloc_buffer(size) {
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16); // .grow() takes a delta compared to the previous size
        updateGlobalBufferAndViews(wasmMemory.buffer);
        return 1 /*success*/;
      } catch(e) {
        console.error('emscripten_realloc_buffer: Attempted to grow heap from ' + buffer.byteLength  + ' bytes to ' + size + ' bytes, but got error: ' + e);
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    }
  function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      // With pthreads, races can happen (another thread might increase the size in between), so return a failure, and let the caller retry.
      assert(requestedSize > oldSize);
  
      // Memory resize rules:
      // 1. Always increase heap size to at least the requested size, rounded up to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap geometrically: increase the heap size according to 
      //                                         MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%),
      //                                         At most overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap linearly: increase the heap size by at least MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3. Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4. If we were unable to allocate as much memory, it may be due to over-eager decision to excessively reserve due to (3) above.
      //    Hence if an allocation fails, cut down on the amount of excess growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      // In CAN_ADDRESS_2GB mode, stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate full 4GB Wasm memories, the size will wrap
      // back to 0 bytes in Wasm side for any code that deals with heap sizes, which would require special casing all heap size related code to treat
      // 0 specially.
      var maxHeapSize = 2147483648;
      if (requestedSize > maxHeapSize) {
        err('Cannot enlarge memory, asked to go up to ' + requestedSize + ' bytes, but the limit is ' + maxHeapSize + ' bytes!');
        return false;
      }
  
      // Loop through potential heap size increases. If we attempt a too eager reservation that fails, cut down on the
      // attempted size and reserve a smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
  
          return true;
        }
      }
      err('Failed to grow the heap from ' + oldSize + ' bytes to ' + newSize + ' bytes, not enough memory!');
      return false;
    }

  var ENV={};
  
  function getExecutableName() {
      return thisProgram || './this.program';
    }
  function getEnvStrings() {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator === 'object' && navigator.languages && navigator.languages[0]) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(x + '=' + env[x]);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    }
  function _environ_get(__environ, environ_buf) {try {
  
      var bufSize = 0;
      getEnvStrings().forEach(function(string, i) {
        var ptr = environ_buf + bufSize;
        HEAP32[(((__environ)+(i * 4))>>2)] = ptr;
        writeAsciiToMemory(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _environ_sizes_get(penviron_count, penviron_buf_size) {try {
  
      var strings = getEnvStrings();
      HEAP32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      strings.forEach(function(string) {
        bufSize += string.length + 1;
      });
      HEAP32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_close(fd) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_fdstat_get(fd, pbuf) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      // All character devices are terminals (other things a Linux system would
      // assume is a character device, like the mouse, we have special APIs for).
      var type = stream.tty ? 2 :
                 FS.isDir(stream.mode) ? 3 :
                 FS.isLink(stream.mode) ? 7 :
                 4;
      HEAP8[((pbuf)>>0)] = type;
      // TODO HEAP16[(((pbuf)+(2))>>1)] = ?;
      // TODO (tempI64 = [?>>>0,(tempDouble=?,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((pbuf)+(8))>>2)] = tempI64[0],HEAP32[(((pbuf)+(12))>>2)] = tempI64[1]);
      // TODO (tempI64 = [?>>>0,(tempDouble=?,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((pbuf)+(16))>>2)] = tempI64[0],HEAP32[(((pbuf)+(20))>>2)] = tempI64[1]);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_read(fd, iov, iovcnt, pnum) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doReadv(stream, iov, iovcnt);
      HEAP32[((pnum)>>2)] = num
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {try {
  
      
      var stream = SYSCALLS.getStreamFromFD(fd);
      var HIGH_OFFSET = 0x100000000; // 2^32
      // use an unsigned operator on low and shift high by 32-bits
      var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
  
      var DOUBLE_LIMIT = 0x20000000000000; // 2^53
      // we also check for equality since DOUBLE_LIMIT + 1 == DOUBLE_LIMIT
      if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
        return -61;
      }
  
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble=stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_sync(fd) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      if (stream.stream_ops && stream.stream_ops.fsync) {
        return -stream.stream_ops.fsync(stream);
      }
      return 0; // we can't do anything synchronously; the in-memory FS is already synced to
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_write(fd, iov, iovcnt, pnum) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doWritev(stream, iov, iovcnt);
      HEAP32[((pnum)>>2)] = num
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _getTempRet0() {
      return getTempRet0();
    }

  function _gettimeofday(ptr) {
      var now = Date.now();
      HEAP32[((ptr)>>2)] = (now/1000)|0; // seconds
      HEAP32[(((ptr)+(4))>>2)] = ((now % 1000)*1000)|0; // microseconds
      return 0;
    }

  function _setTempRet0(val) {
      setTempRet0(val);
    }

  function __isLeapYear(year) {
        return year%4 === 0 && (year%100 !== 0 || year%400 === 0);
    }
  
  function __arraySum(array, index) {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]) {
        // no-op
      }
      return sum;
    }
  
  var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];
  
  var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];
  function __addDays(date, days) {
      var newDate = new Date(date.getTime());
      while (days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
  
        if (days > daysInCurrentMonth-newDate.getDate()) {
          // we spill over to next month
          days -= (daysInCurrentMonth-newDate.getDate()+1);
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth+1)
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear()+1);
          }
        } else {
          // we stay in current month
          newDate.setDate(newDate.getDate()+days);
          return newDate;
        }
      }
  
      return newDate;
    }
  function _strftime(s, maxsize, format, tm) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
  
      var tm_zone = HEAP32[(((tm)+(40))>>2)];
  
      var date = {
        tm_sec: HEAP32[((tm)>>2)],
        tm_min: HEAP32[(((tm)+(4))>>2)],
        tm_hour: HEAP32[(((tm)+(8))>>2)],
        tm_mday: HEAP32[(((tm)+(12))>>2)],
        tm_mon: HEAP32[(((tm)+(16))>>2)],
        tm_year: HEAP32[(((tm)+(20))>>2)],
        tm_wday: HEAP32[(((tm)+(24))>>2)],
        tm_yday: HEAP32[(((tm)+(28))>>2)],
        tm_isdst: HEAP32[(((tm)+(32))>>2)],
        tm_gmtoff: HEAP32[(((tm)+(36))>>2)],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : ''
      };
  
      var pattern = UTF8ToString(format);
  
      // expand format
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',     // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
        '%D': '%m/%d/%y',                 // Equivalent to %m / %d / %y
        '%F': '%Y-%m-%d',                 // Equivalent to %Y - %m - %d
        '%h': '%b',                       // Equivalent to %b
        '%r': '%I:%M:%S %p',              // Replaced by the time in a.m. and p.m. notation
        '%R': '%H:%M',                    // Replaced by the time in 24-hour notation
        '%T': '%H:%M:%S',                 // Replaced by the time
        '%x': '%m/%d/%y',                 // Replaced by the locale's appropriate date representation
        '%X': '%H:%M:%S',                 // Replaced by the locale's appropriate time representation
        // Modified Conversion Specifiers
        '%Ec': '%c',                      // Replaced by the locale's alternative appropriate date and time representation.
        '%EC': '%C',                      // Replaced by the name of the base year (period) in the locale's alternative representation.
        '%Ex': '%m/%d/%y',                // Replaced by the locale's alternative date representation.
        '%EX': '%H:%M:%S',                // Replaced by the locale's alternative time representation.
        '%Ey': '%y',                      // Replaced by the offset from %EC (year only) in the locale's alternative representation.
        '%EY': '%Y',                      // Replaced by the full alternative year representation.
        '%Od': '%d',                      // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading zeros if there is any alternative symbol for zero; otherwise, with leading <space> characters.
        '%Oe': '%e',                      // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading <space> characters.
        '%OH': '%H',                      // Replaced by the hour (24-hour clock) using the locale's alternative numeric symbols.
        '%OI': '%I',                      // Replaced by the hour (12-hour clock) using the locale's alternative numeric symbols.
        '%Om': '%m',                      // Replaced by the month using the locale's alternative numeric symbols.
        '%OM': '%M',                      // Replaced by the minutes using the locale's alternative numeric symbols.
        '%OS': '%S',                      // Replaced by the seconds using the locale's alternative numeric symbols.
        '%Ou': '%u',                      // Replaced by the weekday as a number in the locale's alternative representation (Monday=1).
        '%OU': '%U',                      // Replaced by the week number of the year (Sunday as the first day of the week, rules corresponding to %U ) using the locale's alternative numeric symbols.
        '%OV': '%V',                      // Replaced by the week number of the year (Monday as the first day of the week, rules corresponding to %V ) using the locale's alternative numeric symbols.
        '%Ow': '%w',                      // Replaced by the number of the weekday (Sunday=0) using the locale's alternative numeric symbols.
        '%OW': '%W',                      // Replaced by the week number of the year (Monday as the first day of the week) using the locale's alternative numeric symbols.
        '%Oy': '%y',                      // Replaced by the year (offset from %C ) using the locale's alternative numeric symbols.
      };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule]);
      }
  
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
      function leadingSomething(value, digits, character) {
        var str = typeof value === 'number' ? value.toString() : (value || '');
        while (str.length < digits) {
          str = character[0]+str;
        }
        return str;
      }
  
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0');
      }
  
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : (value > 0 ? 1 : 0);
        }
  
        var compare;
        if ((compare = sgn(date1.getFullYear()-date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth()-date2.getMonth())) === 0) {
            compare = sgn(date1.getDate()-date2.getDate());
          }
        }
        return compare;
      }
  
      function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0: // Sunday
              return new Date(janFourth.getFullYear()-1, 11, 29);
            case 1: // Monday
              return janFourth;
            case 2: // Tuesday
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3: // Wednesday
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4: // Thursday
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5: // Friday
              return new Date(janFourth.getFullYear()-1, 11, 31);
            case 6: // Saturday
              return new Date(janFourth.getFullYear()-1, 11, 30);
          }
      }
  
      function getWeekBasedYear(date) {
          var thisDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear()+1, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            // this date is after the start of the first week of this year
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear()+1;
            } else {
              return thisDate.getFullYear();
            }
          } else {
            return thisDate.getFullYear()-1;
          }
      }
  
      var EXPANSION_RULES_2 = {
        '%a': function(date) {
          return WEEKDAYS[date.tm_wday].substring(0,3);
        },
        '%A': function(date) {
          return WEEKDAYS[date.tm_wday];
        },
        '%b': function(date) {
          return MONTHS[date.tm_mon].substring(0,3);
        },
        '%B': function(date) {
          return MONTHS[date.tm_mon];
        },
        '%C': function(date) {
          var year = date.tm_year+1900;
          return leadingNulls((year/100)|0,2);
        },
        '%d': function(date) {
          return leadingNulls(date.tm_mday, 2);
        },
        '%e': function(date) {
          return leadingSomething(date.tm_mday, 2, ' ');
        },
        '%g': function(date) {
          // %g, %G, and %V give values according to the ISO 8601:2000 standard week-based year.
          // In this system, weeks begin on a Monday and week 1 of the year is the week that includes
          // January 4th, which is also the week that includes the first Thursday of the year, and
          // is also the first week that contains at least four days in the year.
          // If the first Monday of January is the 2nd, 3rd, or 4th, the preceding days are part of
          // the last week of the preceding year; thus, for Saturday 2nd January 1999,
          // %G is replaced by 1998 and %V is replaced by 53. If December 29th, 30th,
          // or 31st is a Monday, it and any following days are part of week 1 of the following year.
          // Thus, for Tuesday 30th December 1997, %G is replaced by 1998 and %V is replaced by 01.
  
          return getWeekBasedYear(date).toString().substring(2);
        },
        '%G': function(date) {
          return getWeekBasedYear(date);
        },
        '%H': function(date) {
          return leadingNulls(date.tm_hour, 2);
        },
        '%I': function(date) {
          var twelveHour = date.tm_hour;
          if (twelveHour == 0) twelveHour = 12;
          else if (twelveHour > 12) twelveHour -= 12;
          return leadingNulls(twelveHour, 2);
        },
        '%j': function(date) {
          // Day of the year (001-366)
          return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon-1), 3);
        },
        '%m': function(date) {
          return leadingNulls(date.tm_mon+1, 2);
        },
        '%M': function(date) {
          return leadingNulls(date.tm_min, 2);
        },
        '%n': function() {
          return '\n';
        },
        '%p': function(date) {
          if (date.tm_hour >= 0 && date.tm_hour < 12) {
            return 'AM';
          } else {
            return 'PM';
          }
        },
        '%S': function(date) {
          return leadingNulls(date.tm_sec, 2);
        },
        '%t': function() {
          return '\t';
        },
        '%u': function(date) {
          return date.tm_wday || 7;
        },
        '%U': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53].
          // The first Sunday of January is the first day of week 1;
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year+1900, 0, 1);
          var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7-janFirst.getDay());
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
  
          // is target date after the first Sunday?
          if (compareByDay(firstSunday, endDate) < 0) {
            // calculate difference in days between first Sunday and endDate
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstSundayUntilEndJanuary = 31-firstSunday.getDate();
            var days = firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
  
          return compareByDay(firstSunday, janFirst) === 0 ? '01': '00';
        },
        '%V': function(date) {
          // Replaced by the week number of the year (Monday as the first day of the week)
          // as a decimal number [01,53]. If the week containing 1 January has four
          // or more days in the new year, then it is considered week 1.
          // Otherwise, it is the last week of the previous year, and the next week is week 1.
          // Both January 4th and the first Thursday of January are always in week 1. [ tm_year, tm_wday, tm_yday]
          var janFourthThisYear = new Date(date.tm_year+1900, 0, 4);
          var janFourthNextYear = new Date(date.tm_year+1901, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          var endDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            // if given date is before this years first week, then it belongs to the 53rd week of last year
            return '53';
          }
  
          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            // if given date is after next years first week, then it belongs to the 01th week of next year
            return '01';
          }
  
          // given date is in between CW 01..53 of this calendar year
          var daysDifference;
          if (firstWeekStartThisYear.getFullYear() < date.tm_year+1900) {
            // first CW of this year starts last year
            daysDifference = date.tm_yday+32-firstWeekStartThisYear.getDate()
          } else {
            // first CW of this year starts this year
            daysDifference = date.tm_yday+1-firstWeekStartThisYear.getDate();
          }
          return leadingNulls(Math.ceil(daysDifference/7), 2);
        },
        '%w': function(date) {
          return date.tm_wday;
        },
        '%W': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53].
          // The first Monday of January is the first day of week 1;
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year, 0, 1);
          var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7-janFirst.getDay()+1);
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
  
          // is target date after the first Monday?
          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstMondayUntilEndJanuary = 31-firstMonday.getDate();
            var days = firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
          return compareByDay(firstMonday, janFirst) === 0 ? '01': '00';
        },
        '%y': function(date) {
          // Replaced by the last two digits of the year as a decimal number [00,99]. [ tm_year]
          return (date.tm_year+1900).toString().substring(2);
        },
        '%Y': function(date) {
          // Replaced by the year as a decimal number (for example, 1997). [ tm_year]
          return date.tm_year+1900;
        },
        '%z': function(date) {
          // Replaced by the offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ).
          // For example, "-0430" means 4 hours 30 minutes behind UTC (west of Greenwich).
          var off = date.tm_gmtoff;
          var ahead = off >= 0;
          off = Math.abs(off) / 60;
          // convert from minutes into hhmm format (which means 60 minutes = 100 units)
          off = (off / 60)*100 + (off % 60);
          return (ahead ? '+' : '-') + String("0000" + off).slice(-4);
        },
        '%Z': function(date) {
          return date.tm_zone;
        },
        '%%': function() {
          return '%';
        }
      };
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.includes(rule)) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date));
        }
      }
  
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      }
  
      writeArrayToMemory(bytes, s);
      return bytes.length-1;
    }
  function _strftime_l(s, maxsize, format, tm) {
      return _strftime(s, maxsize, format, tm); // no locale support yet
    }

  function _time(ptr) {
      var ret = (Date.now()/1000)|0;
      if (ptr) {
        HEAP32[((ptr)>>2)] = ret;
      }
      return ret;
    }

  var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
    if (!parent) {
      parent = this;  // root node sets parent to itself
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
  };
  var readMode = 292/*292*/ | 73/*73*/;
  var writeMode = 146/*146*/;
  Object.defineProperties(FSNode.prototype, {
   read: {
    get: /** @this{FSNode} */function() {
     return (this.mode & readMode) === readMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= readMode : this.mode &= ~readMode;
    }
   },
   write: {
    get: /** @this{FSNode} */function() {
     return (this.mode & writeMode) === writeMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= writeMode : this.mode &= ~writeMode;
    }
   },
   isFolder: {
    get: /** @this{FSNode} */function() {
     return FS.isDir(this.mode);
    }
   },
   isDevice: {
    get: /** @this{FSNode} */function() {
     return FS.isChrdev(this.mode);
    }
   }
  });
  FS.FSNode = FSNode;
  FS.staticInit();;
embind_init_charCodes();
BindingError = Module['BindingError'] = extendError(Error, 'BindingError');;
InternalError = Module['InternalError'] = extendError(Error, 'InternalError');;
init_emval();;
var ASSERTIONS = true;



/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


var asmLibraryArg = {
  "__assert_fail": ___assert_fail,
  "__cxa_atexit": ___cxa_atexit,
  "__gmtime_r": ___gmtime_r,
  "__localtime_r": ___localtime_r,
  "__sys_fcntl64": ___sys_fcntl64,
  "__sys_fstat64": ___sys_fstat64,
  "__sys_ftruncate64": ___sys_ftruncate64,
  "__sys_getdents64": ___sys_getdents64,
  "__sys_getpid": ___sys_getpid,
  "__sys_ioctl": ___sys_ioctl,
  "__sys_madvise1": ___sys_madvise1,
  "__sys_mmap2": ___sys_mmap2,
  "__sys_mprotect": ___sys_mprotect,
  "__sys_munmap": ___sys_munmap,
  "__sys_open": ___sys_open,
  "__sys_rmdir": ___sys_rmdir,
  "__sys_stat64": ___sys_stat64,
  "__sys_unlink": ___sys_unlink,
  "_embind_register_bigint": __embind_register_bigint,
  "_embind_register_bool": __embind_register_bool,
  "_embind_register_emval": __embind_register_emval,
  "_embind_register_float": __embind_register_float,
  "_embind_register_integer": __embind_register_integer,
  "_embind_register_memory_view": __embind_register_memory_view,
  "_embind_register_std_string": __embind_register_std_string,
  "_embind_register_std_wstring": __embind_register_std_wstring,
  "_embind_register_void": __embind_register_void,
  "_emscripten_throw_longjmp": __emscripten_throw_longjmp,
  "abort": _abort,
  "emscripten_asm_const_int": _emscripten_asm_const_int,
  "emscripten_memcpy_big": _emscripten_memcpy_big,
  "emscripten_resize_heap": _emscripten_resize_heap,
  "environ_get": _environ_get,
  "environ_sizes_get": _environ_sizes_get,
  "fd_close": _fd_close,
  "fd_fdstat_get": _fd_fdstat_get,
  "fd_read": _fd_read,
  "fd_seek": _fd_seek,
  "fd_sync": _fd_sync,
  "fd_write": _fd_write,
  "getTempRet0": _getTempRet0,
  "gettimeofday": _gettimeofday,
  "invoke_ii": invoke_ii,
  "invoke_iii": invoke_iii,
  "invoke_iiii": invoke_iiii,
  "invoke_iiiii": invoke_iiiii,
  "invoke_v": invoke_v,
  "invoke_vi": invoke_vi,
  "invoke_vii": invoke_vii,
  "invoke_viii": invoke_viii,
  "invoke_viiii": invoke_viiii,
  "setTempRet0": _setTempRet0,
  "strftime_l": _strftime_l,
  "time": _time
};
var asm = createWasm();
/** @type {function(...*):?} */
var ___wasm_call_ctors = Module["___wasm_call_ctors"] = createExportWrapper("__wasm_call_ctors");

/** @type {function(...*):?} */
var _PDFium_Init = Module["_PDFium_Init"] = createExportWrapper("PDFium_Init");

/** @type {function(...*):?} */
var _FPDF_InitLibraryWithConfig = Module["_FPDF_InitLibraryWithConfig"] = createExportWrapper("FPDF_InitLibraryWithConfig");

/** @type {function(...*):?} */
var _FPDFAnnot_IsSupportedSubtype = Module["_FPDFAnnot_IsSupportedSubtype"] = createExportWrapper("FPDFAnnot_IsSupportedSubtype");

/** @type {function(...*):?} */
var _FPDFPage_CreateAnnot = Module["_FPDFPage_CreateAnnot"] = createExportWrapper("FPDFPage_CreateAnnot");

/** @type {function(...*):?} */
var _FPDFPage_GetAnnotCount = Module["_FPDFPage_GetAnnotCount"] = createExportWrapper("FPDFPage_GetAnnotCount");

/** @type {function(...*):?} */
var _FPDFPage_GetAnnot = Module["_FPDFPage_GetAnnot"] = createExportWrapper("FPDFPage_GetAnnot");

/** @type {function(...*):?} */
var _FPDFPage_GetAnnotIndex = Module["_FPDFPage_GetAnnotIndex"] = createExportWrapper("FPDFPage_GetAnnotIndex");

/** @type {function(...*):?} */
var _FPDFPage_CloseAnnot = Module["_FPDFPage_CloseAnnot"] = createExportWrapper("FPDFPage_CloseAnnot");

/** @type {function(...*):?} */
var _FPDFPage_RemoveAnnot = Module["_FPDFPage_RemoveAnnot"] = createExportWrapper("FPDFPage_RemoveAnnot");

/** @type {function(...*):?} */
var _FPDFAnnot_GetSubtype = Module["_FPDFAnnot_GetSubtype"] = createExportWrapper("FPDFAnnot_GetSubtype");

/** @type {function(...*):?} */
var _FPDFAnnot_IsObjectSupportedSubtype = Module["_FPDFAnnot_IsObjectSupportedSubtype"] = createExportWrapper("FPDFAnnot_IsObjectSupportedSubtype");

/** @type {function(...*):?} */
var _FPDFAnnot_UpdateObject = Module["_FPDFAnnot_UpdateObject"] = createExportWrapper("FPDFAnnot_UpdateObject");

/** @type {function(...*):?} */
var _FPDFAnnot_AddInkStroke = Module["_FPDFAnnot_AddInkStroke"] = createExportWrapper("FPDFAnnot_AddInkStroke");

/** @type {function(...*):?} */
var _FPDFAnnot_RemoveInkList = Module["_FPDFAnnot_RemoveInkList"] = createExportWrapper("FPDFAnnot_RemoveInkList");

/** @type {function(...*):?} */
var _FPDFAnnot_AppendObject = Module["_FPDFAnnot_AppendObject"] = createExportWrapper("FPDFAnnot_AppendObject");

/** @type {function(...*):?} */
var _FPDFAnnot_GetObjectCount = Module["_FPDFAnnot_GetObjectCount"] = createExportWrapper("FPDFAnnot_GetObjectCount");

/** @type {function(...*):?} */
var _FPDFAnnot_GetObject = Module["_FPDFAnnot_GetObject"] = createExportWrapper("FPDFAnnot_GetObject");

/** @type {function(...*):?} */
var _FPDFAnnot_RemoveObject = Module["_FPDFAnnot_RemoveObject"] = createExportWrapper("FPDFAnnot_RemoveObject");

/** @type {function(...*):?} */
var _FPDFAnnot_SetColor = Module["_FPDFAnnot_SetColor"] = createExportWrapper("FPDFAnnot_SetColor");

/** @type {function(...*):?} */
var _FPDFAnnot_GetColor = Module["_FPDFAnnot_GetColor"] = createExportWrapper("FPDFAnnot_GetColor");

/** @type {function(...*):?} */
var _FPDFAnnot_HasAttachmentPoints = Module["_FPDFAnnot_HasAttachmentPoints"] = createExportWrapper("FPDFAnnot_HasAttachmentPoints");

/** @type {function(...*):?} */
var _FPDFAnnot_SetAttachmentPoints = Module["_FPDFAnnot_SetAttachmentPoints"] = createExportWrapper("FPDFAnnot_SetAttachmentPoints");

/** @type {function(...*):?} */
var _FPDFAnnot_AppendAttachmentPoints = Module["_FPDFAnnot_AppendAttachmentPoints"] = createExportWrapper("FPDFAnnot_AppendAttachmentPoints");

/** @type {function(...*):?} */
var _FPDFAnnot_CountAttachmentPoints = Module["_FPDFAnnot_CountAttachmentPoints"] = createExportWrapper("FPDFAnnot_CountAttachmentPoints");

/** @type {function(...*):?} */
var _FPDFAnnot_GetAttachmentPoints = Module["_FPDFAnnot_GetAttachmentPoints"] = createExportWrapper("FPDFAnnot_GetAttachmentPoints");

/** @type {function(...*):?} */
var _FPDFAnnot_SetRect = Module["_FPDFAnnot_SetRect"] = createExportWrapper("FPDFAnnot_SetRect");

/** @type {function(...*):?} */
var _FPDFAnnot_GetRect = Module["_FPDFAnnot_GetRect"] = createExportWrapper("FPDFAnnot_GetRect");

/** @type {function(...*):?} */
var _FPDFAnnot_GetVertices = Module["_FPDFAnnot_GetVertices"] = createExportWrapper("FPDFAnnot_GetVertices");

/** @type {function(...*):?} */
var _FPDFAnnot_GetInkListCount = Module["_FPDFAnnot_GetInkListCount"] = createExportWrapper("FPDFAnnot_GetInkListCount");

/** @type {function(...*):?} */
var _FPDFAnnot_GetInkListPath = Module["_FPDFAnnot_GetInkListPath"] = createExportWrapper("FPDFAnnot_GetInkListPath");

/** @type {function(...*):?} */
var _FPDFAnnot_GetLine = Module["_FPDFAnnot_GetLine"] = createExportWrapper("FPDFAnnot_GetLine");

/** @type {function(...*):?} */
var _FPDFAnnot_SetBorder = Module["_FPDFAnnot_SetBorder"] = createExportWrapper("FPDFAnnot_SetBorder");

/** @type {function(...*):?} */
var _FPDFAnnot_GetBorder = Module["_FPDFAnnot_GetBorder"] = createExportWrapper("FPDFAnnot_GetBorder");

/** @type {function(...*):?} */
var _FPDFAnnot_HasKey = Module["_FPDFAnnot_HasKey"] = createExportWrapper("FPDFAnnot_HasKey");

/** @type {function(...*):?} */
var _FPDFAnnot_GetValueType = Module["_FPDFAnnot_GetValueType"] = createExportWrapper("FPDFAnnot_GetValueType");

/** @type {function(...*):?} */
var _FPDFAnnot_SetStringValue = Module["_FPDFAnnot_SetStringValue"] = createExportWrapper("FPDFAnnot_SetStringValue");

/** @type {function(...*):?} */
var _FPDFAnnot_GetStringValue = Module["_FPDFAnnot_GetStringValue"] = createExportWrapper("FPDFAnnot_GetStringValue");

/** @type {function(...*):?} */
var _FPDFAnnot_GetNumberValue = Module["_FPDFAnnot_GetNumberValue"] = createExportWrapper("FPDFAnnot_GetNumberValue");

/** @type {function(...*):?} */
var _FPDFAnnot_SetAP = Module["_FPDFAnnot_SetAP"] = createExportWrapper("FPDFAnnot_SetAP");

/** @type {function(...*):?} */
var _FPDFAnnot_GetAP = Module["_FPDFAnnot_GetAP"] = createExportWrapper("FPDFAnnot_GetAP");

/** @type {function(...*):?} */
var _FPDFAnnot_GetLinkedAnnot = Module["_FPDFAnnot_GetLinkedAnnot"] = createExportWrapper("FPDFAnnot_GetLinkedAnnot");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFlags = Module["_FPDFAnnot_GetFlags"] = createExportWrapper("FPDFAnnot_GetFlags");

/** @type {function(...*):?} */
var _FPDFAnnot_SetFlags = Module["_FPDFAnnot_SetFlags"] = createExportWrapper("FPDFAnnot_SetFlags");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFormFieldFlags = Module["_FPDFAnnot_GetFormFieldFlags"] = createExportWrapper("FPDFAnnot_GetFormFieldFlags");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFormFieldAtPoint = Module["_FPDFAnnot_GetFormFieldAtPoint"] = createExportWrapper("FPDFAnnot_GetFormFieldAtPoint");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFormFieldName = Module["_FPDFAnnot_GetFormFieldName"] = createExportWrapper("FPDFAnnot_GetFormFieldName");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFormFieldType = Module["_FPDFAnnot_GetFormFieldType"] = createExportWrapper("FPDFAnnot_GetFormFieldType");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFormFieldValue = Module["_FPDFAnnot_GetFormFieldValue"] = createExportWrapper("FPDFAnnot_GetFormFieldValue");

/** @type {function(...*):?} */
var _FPDFAnnot_GetOptionCount = Module["_FPDFAnnot_GetOptionCount"] = createExportWrapper("FPDFAnnot_GetOptionCount");

/** @type {function(...*):?} */
var _FPDFAnnot_GetOptionLabel = Module["_FPDFAnnot_GetOptionLabel"] = createExportWrapper("FPDFAnnot_GetOptionLabel");

/** @type {function(...*):?} */
var _FPDFAnnot_IsOptionSelected = Module["_FPDFAnnot_IsOptionSelected"] = createExportWrapper("FPDFAnnot_IsOptionSelected");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFontSize = Module["_FPDFAnnot_GetFontSize"] = createExportWrapper("FPDFAnnot_GetFontSize");

/** @type {function(...*):?} */
var _FPDFAnnot_IsChecked = Module["_FPDFAnnot_IsChecked"] = createExportWrapper("FPDFAnnot_IsChecked");

/** @type {function(...*):?} */
var _FPDFAnnot_SetFocusableSubtypes = Module["_FPDFAnnot_SetFocusableSubtypes"] = createExportWrapper("FPDFAnnot_SetFocusableSubtypes");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFocusableSubtypesCount = Module["_FPDFAnnot_GetFocusableSubtypesCount"] = createExportWrapper("FPDFAnnot_GetFocusableSubtypesCount");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFocusableSubtypes = Module["_FPDFAnnot_GetFocusableSubtypes"] = createExportWrapper("FPDFAnnot_GetFocusableSubtypes");

/** @type {function(...*):?} */
var _FPDFAnnot_GetLink = Module["_FPDFAnnot_GetLink"] = createExportWrapper("FPDFAnnot_GetLink");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFormControlCount = Module["_FPDFAnnot_GetFormControlCount"] = createExportWrapper("FPDFAnnot_GetFormControlCount");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFormControlIndex = Module["_FPDFAnnot_GetFormControlIndex"] = createExportWrapper("FPDFAnnot_GetFormControlIndex");

/** @type {function(...*):?} */
var _FPDFAnnot_GetFormFieldExportValue = Module["_FPDFAnnot_GetFormFieldExportValue"] = createExportWrapper("FPDFAnnot_GetFormFieldExportValue");

/** @type {function(...*):?} */
var _FPDFAnnot_SetURI = Module["_FPDFAnnot_SetURI"] = createExportWrapper("FPDFAnnot_SetURI");

/** @type {function(...*):?} */
var _FPDFDoc_GetAttachmentCount = Module["_FPDFDoc_GetAttachmentCount"] = createExportWrapper("FPDFDoc_GetAttachmentCount");

/** @type {function(...*):?} */
var _FPDFDoc_AddAttachment = Module["_FPDFDoc_AddAttachment"] = createExportWrapper("FPDFDoc_AddAttachment");

/** @type {function(...*):?} */
var _FPDFDoc_GetAttachment = Module["_FPDFDoc_GetAttachment"] = createExportWrapper("FPDFDoc_GetAttachment");

/** @type {function(...*):?} */
var _FPDFDoc_DeleteAttachment = Module["_FPDFDoc_DeleteAttachment"] = createExportWrapper("FPDFDoc_DeleteAttachment");

/** @type {function(...*):?} */
var _FPDFAttachment_GetName = Module["_FPDFAttachment_GetName"] = createExportWrapper("FPDFAttachment_GetName");

/** @type {function(...*):?} */
var _FPDFAttachment_HasKey = Module["_FPDFAttachment_HasKey"] = createExportWrapper("FPDFAttachment_HasKey");

/** @type {function(...*):?} */
var _FPDFAttachment_GetValueType = Module["_FPDFAttachment_GetValueType"] = createExportWrapper("FPDFAttachment_GetValueType");

/** @type {function(...*):?} */
var _FPDFAttachment_SetStringValue = Module["_FPDFAttachment_SetStringValue"] = createExportWrapper("FPDFAttachment_SetStringValue");

/** @type {function(...*):?} */
var _FPDFAttachment_GetStringValue = Module["_FPDFAttachment_GetStringValue"] = createExportWrapper("FPDFAttachment_GetStringValue");

/** @type {function(...*):?} */
var _FPDFAttachment_SetFile = Module["_FPDFAttachment_SetFile"] = createExportWrapper("FPDFAttachment_SetFile");

/** @type {function(...*):?} */
var _FPDFAttachment_GetFile = Module["_FPDFAttachment_GetFile"] = createExportWrapper("FPDFAttachment_GetFile");

/** @type {function(...*):?} */
var _FPDFCatalog_IsTagged = Module["_FPDFCatalog_IsTagged"] = createExportWrapper("FPDFCatalog_IsTagged");

/** @type {function(...*):?} */
var _FPDFAvail_Create = Module["_FPDFAvail_Create"] = createExportWrapper("FPDFAvail_Create");

/** @type {function(...*):?} */
var _FPDFAvail_Destroy = Module["_FPDFAvail_Destroy"] = createExportWrapper("FPDFAvail_Destroy");

/** @type {function(...*):?} */
var _FPDFAvail_IsDocAvail = Module["_FPDFAvail_IsDocAvail"] = createExportWrapper("FPDFAvail_IsDocAvail");

/** @type {function(...*):?} */
var _FPDFAvail_GetDocument = Module["_FPDFAvail_GetDocument"] = createExportWrapper("FPDFAvail_GetDocument");

/** @type {function(...*):?} */
var _FPDFAvail_GetFirstPageNum = Module["_FPDFAvail_GetFirstPageNum"] = createExportWrapper("FPDFAvail_GetFirstPageNum");

/** @type {function(...*):?} */
var _FPDFAvail_IsPageAvail = Module["_FPDFAvail_IsPageAvail"] = createExportWrapper("FPDFAvail_IsPageAvail");

/** @type {function(...*):?} */
var _FPDFAvail_IsFormAvail = Module["_FPDFAvail_IsFormAvail"] = createExportWrapper("FPDFAvail_IsFormAvail");

/** @type {function(...*):?} */
var _FPDFAvail_IsLinearized = Module["_FPDFAvail_IsLinearized"] = createExportWrapper("FPDFAvail_IsLinearized");

/** @type {function(...*):?} */
var _FPDFBookmark_GetFirstChild = Module["_FPDFBookmark_GetFirstChild"] = createExportWrapper("FPDFBookmark_GetFirstChild");

/** @type {function(...*):?} */
var _FPDFBookmark_GetNextSibling = Module["_FPDFBookmark_GetNextSibling"] = createExportWrapper("FPDFBookmark_GetNextSibling");

/** @type {function(...*):?} */
var _FPDFBookmark_GetTitle = Module["_FPDFBookmark_GetTitle"] = createExportWrapper("FPDFBookmark_GetTitle");

/** @type {function(...*):?} */
var _FPDFBookmark_GetCount = Module["_FPDFBookmark_GetCount"] = createExportWrapper("FPDFBookmark_GetCount");

/** @type {function(...*):?} */
var _FPDFBookmark_Find = Module["_FPDFBookmark_Find"] = createExportWrapper("FPDFBookmark_Find");

/** @type {function(...*):?} */
var _FPDFBookmark_GetDest = Module["_FPDFBookmark_GetDest"] = createExportWrapper("FPDFBookmark_GetDest");

/** @type {function(...*):?} */
var _FPDFBookmark_GetAction = Module["_FPDFBookmark_GetAction"] = createExportWrapper("FPDFBookmark_GetAction");

/** @type {function(...*):?} */
var _FPDFAction_GetType = Module["_FPDFAction_GetType"] = createExportWrapper("FPDFAction_GetType");

/** @type {function(...*):?} */
var _FPDFAction_GetDest = Module["_FPDFAction_GetDest"] = createExportWrapper("FPDFAction_GetDest");

/** @type {function(...*):?} */
var _FPDFAction_GetFilePath = Module["_FPDFAction_GetFilePath"] = createExportWrapper("FPDFAction_GetFilePath");

/** @type {function(...*):?} */
var _FPDFAction_GetURIPath = Module["_FPDFAction_GetURIPath"] = createExportWrapper("FPDFAction_GetURIPath");

/** @type {function(...*):?} */
var _FPDFDest_GetDestPageIndex = Module["_FPDFDest_GetDestPageIndex"] = createExportWrapper("FPDFDest_GetDestPageIndex");

/** @type {function(...*):?} */
var _FPDFDest_GetView = Module["_FPDFDest_GetView"] = createExportWrapper("FPDFDest_GetView");

/** @type {function(...*):?} */
var _FPDFDest_GetLocationInPage = Module["_FPDFDest_GetLocationInPage"] = createExportWrapper("FPDFDest_GetLocationInPage");

/** @type {function(...*):?} */
var _FPDFLink_GetLinkAtPoint = Module["_FPDFLink_GetLinkAtPoint"] = createExportWrapper("FPDFLink_GetLinkAtPoint");

/** @type {function(...*):?} */
var _FPDFLink_GetLinkZOrderAtPoint = Module["_FPDFLink_GetLinkZOrderAtPoint"] = createExportWrapper("FPDFLink_GetLinkZOrderAtPoint");

/** @type {function(...*):?} */
var _FPDFLink_GetDest = Module["_FPDFLink_GetDest"] = createExportWrapper("FPDFLink_GetDest");

/** @type {function(...*):?} */
var _FPDFLink_GetAction = Module["_FPDFLink_GetAction"] = createExportWrapper("FPDFLink_GetAction");

/** @type {function(...*):?} */
var _FPDFLink_Enumerate = Module["_FPDFLink_Enumerate"] = createExportWrapper("FPDFLink_Enumerate");

/** @type {function(...*):?} */
var _FPDFLink_GetAnnot = Module["_FPDFLink_GetAnnot"] = createExportWrapper("FPDFLink_GetAnnot");

/** @type {function(...*):?} */
var _FPDFLink_GetAnnotRect = Module["_FPDFLink_GetAnnotRect"] = createExportWrapper("FPDFLink_GetAnnotRect");

/** @type {function(...*):?} */
var _FPDFLink_CountQuadPoints = Module["_FPDFLink_CountQuadPoints"] = createExportWrapper("FPDFLink_CountQuadPoints");

/** @type {function(...*):?} */
var _FPDFLink_GetQuadPoints = Module["_FPDFLink_GetQuadPoints"] = createExportWrapper("FPDFLink_GetQuadPoints");

/** @type {function(...*):?} */
var _FPDF_GetPageAAction = Module["_FPDF_GetPageAAction"] = createExportWrapper("FPDF_GetPageAAction");

/** @type {function(...*):?} */
var _FPDF_GetFileIdentifier = Module["_FPDF_GetFileIdentifier"] = createExportWrapper("FPDF_GetFileIdentifier");

/** @type {function(...*):?} */
var _FPDF_GetMetaText = Module["_FPDF_GetMetaText"] = createExportWrapper("FPDF_GetMetaText");

/** @type {function(...*):?} */
var _FPDF_GetPageLabel = Module["_FPDF_GetPageLabel"] = createExportWrapper("FPDF_GetPageLabel");

/** @type {function(...*):?} */
var _FPDFPageObj_NewImageObj = Module["_FPDFPageObj_NewImageObj"] = createExportWrapper("FPDFPageObj_NewImageObj");

/** @type {function(...*):?} */
var _FPDFImageObj_LoadJpegFile = Module["_FPDFImageObj_LoadJpegFile"] = createExportWrapper("FPDFImageObj_LoadJpegFile");

/** @type {function(...*):?} */
var _FPDFImageObj_LoadJpegFileInline = Module["_FPDFImageObj_LoadJpegFileInline"] = createExportWrapper("FPDFImageObj_LoadJpegFileInline");

/** @type {function(...*):?} */
var _FPDFImageObj_SetMatrix = Module["_FPDFImageObj_SetMatrix"] = createExportWrapper("FPDFImageObj_SetMatrix");

/** @type {function(...*):?} */
var _FPDFImageObj_SetBitmap = Module["_FPDFImageObj_SetBitmap"] = createExportWrapper("FPDFImageObj_SetBitmap");

/** @type {function(...*):?} */
var _FPDFImageObj_GetBitmap = Module["_FPDFImageObj_GetBitmap"] = createExportWrapper("FPDFImageObj_GetBitmap");

/** @type {function(...*):?} */
var _FPDFImageObj_GetRenderedBitmap = Module["_FPDFImageObj_GetRenderedBitmap"] = createExportWrapper("FPDFImageObj_GetRenderedBitmap");

/** @type {function(...*):?} */
var _FPDFImageObj_GetImageDataDecoded = Module["_FPDFImageObj_GetImageDataDecoded"] = createExportWrapper("FPDFImageObj_GetImageDataDecoded");

/** @type {function(...*):?} */
var _FPDFImageObj_GetImageDataRaw = Module["_FPDFImageObj_GetImageDataRaw"] = createExportWrapper("FPDFImageObj_GetImageDataRaw");

/** @type {function(...*):?} */
var _FPDFImageObj_GetImageFilterCount = Module["_FPDFImageObj_GetImageFilterCount"] = createExportWrapper("FPDFImageObj_GetImageFilterCount");

/** @type {function(...*):?} */
var _FPDFImageObj_GetImageFilter = Module["_FPDFImageObj_GetImageFilter"] = createExportWrapper("FPDFImageObj_GetImageFilter");

/** @type {function(...*):?} */
var _FPDFImageObj_GetImageMetadata = Module["_FPDFImageObj_GetImageMetadata"] = createExportWrapper("FPDFImageObj_GetImageMetadata");

/** @type {function(...*):?} */
var _FPDF_CreateNewDocument = Module["_FPDF_CreateNewDocument"] = createExportWrapper("FPDF_CreateNewDocument");

/** @type {function(...*):?} */
var _FPDFPage_Delete = Module["_FPDFPage_Delete"] = createExportWrapper("FPDFPage_Delete");

/** @type {function(...*):?} */
var _FPDFPage_New = Module["_FPDFPage_New"] = createExportWrapper("FPDFPage_New");

/** @type {function(...*):?} */
var _FPDFPage_GetRotation = Module["_FPDFPage_GetRotation"] = createExportWrapper("FPDFPage_GetRotation");

/** @type {function(...*):?} */
var _FPDFPage_InsertObject = Module["_FPDFPage_InsertObject"] = createExportWrapper("FPDFPage_InsertObject");

/** @type {function(...*):?} */
var _FPDFPage_RemoveObject = Module["_FPDFPage_RemoveObject"] = createExportWrapper("FPDFPage_RemoveObject");

/** @type {function(...*):?} */
var _FPDFPage_CountObjects = Module["_FPDFPage_CountObjects"] = createExportWrapper("FPDFPage_CountObjects");

/** @type {function(...*):?} */
var _FPDFPage_GetObject = Module["_FPDFPage_GetObject"] = createExportWrapper("FPDFPage_GetObject");

/** @type {function(...*):?} */
var _FPDFPage_HasTransparency = Module["_FPDFPage_HasTransparency"] = createExportWrapper("FPDFPage_HasTransparency");

/** @type {function(...*):?} */
var _FPDFPageObj_Destroy = Module["_FPDFPageObj_Destroy"] = createExportWrapper("FPDFPageObj_Destroy");

/** @type {function(...*):?} */
var _FPDFPageObj_CountMarks = Module["_FPDFPageObj_CountMarks"] = createExportWrapper("FPDFPageObj_CountMarks");

/** @type {function(...*):?} */
var _FPDFPageObj_GetMark = Module["_FPDFPageObj_GetMark"] = createExportWrapper("FPDFPageObj_GetMark");

/** @type {function(...*):?} */
var _FPDFPageObj_AddMark = Module["_FPDFPageObj_AddMark"] = createExportWrapper("FPDFPageObj_AddMark");

/** @type {function(...*):?} */
var _FPDFPageObj_RemoveMark = Module["_FPDFPageObj_RemoveMark"] = createExportWrapper("FPDFPageObj_RemoveMark");

/** @type {function(...*):?} */
var _FPDFPageObjMark_GetName = Module["_FPDFPageObjMark_GetName"] = createExportWrapper("FPDFPageObjMark_GetName");

/** @type {function(...*):?} */
var _FPDFPageObjMark_CountParams = Module["_FPDFPageObjMark_CountParams"] = createExportWrapper("FPDFPageObjMark_CountParams");

/** @type {function(...*):?} */
var _FPDFPageObjMark_GetParamKey = Module["_FPDFPageObjMark_GetParamKey"] = createExportWrapper("FPDFPageObjMark_GetParamKey");

/** @type {function(...*):?} */
var _FPDFPageObjMark_GetParamValueType = Module["_FPDFPageObjMark_GetParamValueType"] = createExportWrapper("FPDFPageObjMark_GetParamValueType");

/** @type {function(...*):?} */
var _FPDFPageObjMark_GetParamIntValue = Module["_FPDFPageObjMark_GetParamIntValue"] = createExportWrapper("FPDFPageObjMark_GetParamIntValue");

/** @type {function(...*):?} */
var _FPDFPageObjMark_GetParamStringValue = Module["_FPDFPageObjMark_GetParamStringValue"] = createExportWrapper("FPDFPageObjMark_GetParamStringValue");

/** @type {function(...*):?} */
var _FPDFPageObjMark_GetParamBlobValue = Module["_FPDFPageObjMark_GetParamBlobValue"] = createExportWrapper("FPDFPageObjMark_GetParamBlobValue");

/** @type {function(...*):?} */
var _FPDFPageObj_HasTransparency = Module["_FPDFPageObj_HasTransparency"] = createExportWrapper("FPDFPageObj_HasTransparency");

/** @type {function(...*):?} */
var _FPDFPageObjMark_SetIntParam = Module["_FPDFPageObjMark_SetIntParam"] = createExportWrapper("FPDFPageObjMark_SetIntParam");

/** @type {function(...*):?} */
var _FPDFPageObjMark_SetStringParam = Module["_FPDFPageObjMark_SetStringParam"] = createExportWrapper("FPDFPageObjMark_SetStringParam");

/** @type {function(...*):?} */
var _FPDFPageObjMark_SetBlobParam = Module["_FPDFPageObjMark_SetBlobParam"] = createExportWrapper("FPDFPageObjMark_SetBlobParam");

/** @type {function(...*):?} */
var _FPDFPageObjMark_RemoveParam = Module["_FPDFPageObjMark_RemoveParam"] = createExportWrapper("FPDFPageObjMark_RemoveParam");

/** @type {function(...*):?} */
var _FPDFPageObj_GetType = Module["_FPDFPageObj_GetType"] = createExportWrapper("FPDFPageObj_GetType");

/** @type {function(...*):?} */
var _FPDFPage_GenerateContent = Module["_FPDFPage_GenerateContent"] = createExportWrapper("FPDFPage_GenerateContent");

/** @type {function(...*):?} */
var _FPDFPageObj_Transform = Module["_FPDFPageObj_Transform"] = createExportWrapper("FPDFPageObj_Transform");

/** @type {function(...*):?} */
var _FPDFPageObj_GetMatrix = Module["_FPDFPageObj_GetMatrix"] = createExportWrapper("FPDFPageObj_GetMatrix");

/** @type {function(...*):?} */
var _FPDFPageObj_SetMatrix = Module["_FPDFPageObj_SetMatrix"] = createExportWrapper("FPDFPageObj_SetMatrix");

/** @type {function(...*):?} */
var _FPDFPageObj_SetBlendMode = Module["_FPDFPageObj_SetBlendMode"] = createExportWrapper("FPDFPageObj_SetBlendMode");

/** @type {function(...*):?} */
var _FPDFPage_TransformAnnots = Module["_FPDFPage_TransformAnnots"] = createExportWrapper("FPDFPage_TransformAnnots");

/** @type {function(...*):?} */
var _FPDFPage_SetRotation = Module["_FPDFPage_SetRotation"] = createExportWrapper("FPDFPage_SetRotation");

/** @type {function(...*):?} */
var _FPDFPageObj_SetFillColor = Module["_FPDFPageObj_SetFillColor"] = createExportWrapper("FPDFPageObj_SetFillColor");

/** @type {function(...*):?} */
var _FPDFPageObj_GetFillColor = Module["_FPDFPageObj_GetFillColor"] = createExportWrapper("FPDFPageObj_GetFillColor");

/** @type {function(...*):?} */
var _FPDFPageObj_GetBounds = Module["_FPDFPageObj_GetBounds"] = createExportWrapper("FPDFPageObj_GetBounds");

/** @type {function(...*):?} */
var _FPDFPageObj_GetRotatedBounds = Module["_FPDFPageObj_GetRotatedBounds"] = createExportWrapper("FPDFPageObj_GetRotatedBounds");

/** @type {function(...*):?} */
var _FPDFPageObj_SetStrokeColor = Module["_FPDFPageObj_SetStrokeColor"] = createExportWrapper("FPDFPageObj_SetStrokeColor");

/** @type {function(...*):?} */
var _FPDFPageObj_GetStrokeColor = Module["_FPDFPageObj_GetStrokeColor"] = createExportWrapper("FPDFPageObj_GetStrokeColor");

/** @type {function(...*):?} */
var _FPDFPageObj_SetStrokeWidth = Module["_FPDFPageObj_SetStrokeWidth"] = createExportWrapper("FPDFPageObj_SetStrokeWidth");

/** @type {function(...*):?} */
var _FPDFPageObj_GetStrokeWidth = Module["_FPDFPageObj_GetStrokeWidth"] = createExportWrapper("FPDFPageObj_GetStrokeWidth");

/** @type {function(...*):?} */
var _FPDFPageObj_GetLineJoin = Module["_FPDFPageObj_GetLineJoin"] = createExportWrapper("FPDFPageObj_GetLineJoin");

/** @type {function(...*):?} */
var _FPDFPageObj_SetLineJoin = Module["_FPDFPageObj_SetLineJoin"] = createExportWrapper("FPDFPageObj_SetLineJoin");

/** @type {function(...*):?} */
var _FPDFPageObj_GetLineCap = Module["_FPDFPageObj_GetLineCap"] = createExportWrapper("FPDFPageObj_GetLineCap");

/** @type {function(...*):?} */
var _FPDFPageObj_SetLineCap = Module["_FPDFPageObj_SetLineCap"] = createExportWrapper("FPDFPageObj_SetLineCap");

/** @type {function(...*):?} */
var _FPDFPageObj_GetDashPhase = Module["_FPDFPageObj_GetDashPhase"] = createExportWrapper("FPDFPageObj_GetDashPhase");

/** @type {function(...*):?} */
var _FPDFPageObj_SetDashPhase = Module["_FPDFPageObj_SetDashPhase"] = createExportWrapper("FPDFPageObj_SetDashPhase");

/** @type {function(...*):?} */
var _FPDFPageObj_GetDashCount = Module["_FPDFPageObj_GetDashCount"] = createExportWrapper("FPDFPageObj_GetDashCount");

/** @type {function(...*):?} */
var _FPDFPageObj_GetDashArray = Module["_FPDFPageObj_GetDashArray"] = createExportWrapper("FPDFPageObj_GetDashArray");

/** @type {function(...*):?} */
var _FPDFPageObj_SetDashArray = Module["_FPDFPageObj_SetDashArray"] = createExportWrapper("FPDFPageObj_SetDashArray");

/** @type {function(...*):?} */
var _FPDFFormObj_CountObjects = Module["_FPDFFormObj_CountObjects"] = createExportWrapper("FPDFFormObj_CountObjects");

/** @type {function(...*):?} */
var _FPDFFormObj_GetObject = Module["_FPDFFormObj_GetObject"] = createExportWrapper("FPDFFormObj_GetObject");

/** @type {function(...*):?} */
var _FPDFPageObj_CreateNewPath = Module["_FPDFPageObj_CreateNewPath"] = createExportWrapper("FPDFPageObj_CreateNewPath");

/** @type {function(...*):?} */
var _FPDFPageObj_CreateNewRect = Module["_FPDFPageObj_CreateNewRect"] = createExportWrapper("FPDFPageObj_CreateNewRect");

/** @type {function(...*):?} */
var _FPDFPath_CountSegments = Module["_FPDFPath_CountSegments"] = createExportWrapper("FPDFPath_CountSegments");

/** @type {function(...*):?} */
var _FPDFPath_GetPathSegment = Module["_FPDFPath_GetPathSegment"] = createExportWrapper("FPDFPath_GetPathSegment");

/** @type {function(...*):?} */
var _FPDFPath_MoveTo = Module["_FPDFPath_MoveTo"] = createExportWrapper("FPDFPath_MoveTo");

/** @type {function(...*):?} */
var _FPDFPath_LineTo = Module["_FPDFPath_LineTo"] = createExportWrapper("FPDFPath_LineTo");

/** @type {function(...*):?} */
var _FPDFPath_BezierTo = Module["_FPDFPath_BezierTo"] = createExportWrapper("FPDFPath_BezierTo");

/** @type {function(...*):?} */
var _FPDFPath_Close = Module["_FPDFPath_Close"] = createExportWrapper("FPDFPath_Close");

/** @type {function(...*):?} */
var _FPDFPath_SetDrawMode = Module["_FPDFPath_SetDrawMode"] = createExportWrapper("FPDFPath_SetDrawMode");

/** @type {function(...*):?} */
var _FPDFPath_GetDrawMode = Module["_FPDFPath_GetDrawMode"] = createExportWrapper("FPDFPath_GetDrawMode");

/** @type {function(...*):?} */
var _FPDFPathSegment_GetPoint = Module["_FPDFPathSegment_GetPoint"] = createExportWrapper("FPDFPathSegment_GetPoint");

/** @type {function(...*):?} */
var _FPDFPathSegment_GetType = Module["_FPDFPathSegment_GetType"] = createExportWrapper("FPDFPathSegment_GetType");

/** @type {function(...*):?} */
var _FPDFPathSegment_GetClose = Module["_FPDFPathSegment_GetClose"] = createExportWrapper("FPDFPathSegment_GetClose");

/** @type {function(...*):?} */
var _FPDFPageObj_NewTextObj = Module["_FPDFPageObj_NewTextObj"] = createExportWrapper("FPDFPageObj_NewTextObj");

/** @type {function(...*):?} */
var _FPDFText_SetText = Module["_FPDFText_SetText"] = createExportWrapper("FPDFText_SetText");

/** @type {function(...*):?} */
var _FPDFText_SetCharcodes = Module["_FPDFText_SetCharcodes"] = createExportWrapper("FPDFText_SetCharcodes");

/** @type {function(...*):?} */
var _FPDFText_LoadFont = Module["_FPDFText_LoadFont"] = createExportWrapper("FPDFText_LoadFont");

/** @type {function(...*):?} */
var _FPDFText_LoadStandardFont = Module["_FPDFText_LoadStandardFont"] = createExportWrapper("FPDFText_LoadStandardFont");

/** @type {function(...*):?} */
var _FPDFTextObj_GetFontSize = Module["_FPDFTextObj_GetFontSize"] = createExportWrapper("FPDFTextObj_GetFontSize");

/** @type {function(...*):?} */
var _FPDFTextObj_GetText = Module["_FPDFTextObj_GetText"] = createExportWrapper("FPDFTextObj_GetText");

/** @type {function(...*):?} */
var _FPDFTextObj_GetRenderedBitmap = Module["_FPDFTextObj_GetRenderedBitmap"] = createExportWrapper("FPDFTextObj_GetRenderedBitmap");

/** @type {function(...*):?} */
var _FPDFFont_Close = Module["_FPDFFont_Close"] = createExportWrapper("FPDFFont_Close");

/** @type {function(...*):?} */
var _FPDFPageObj_CreateTextObj = Module["_FPDFPageObj_CreateTextObj"] = createExportWrapper("FPDFPageObj_CreateTextObj");

/** @type {function(...*):?} */
var _FPDFTextObj_GetTextRenderMode = Module["_FPDFTextObj_GetTextRenderMode"] = createExportWrapper("FPDFTextObj_GetTextRenderMode");

/** @type {function(...*):?} */
var _FPDFTextObj_SetTextRenderMode = Module["_FPDFTextObj_SetTextRenderMode"] = createExportWrapper("FPDFTextObj_SetTextRenderMode");

/** @type {function(...*):?} */
var _FPDFTextObj_GetFont = Module["_FPDFTextObj_GetFont"] = createExportWrapper("FPDFTextObj_GetFont");

/** @type {function(...*):?} */
var _FPDFFont_GetFontName = Module["_FPDFFont_GetFontName"] = createExportWrapper("FPDFFont_GetFontName");

/** @type {function(...*):?} */
var _FPDFFont_GetFontData = Module["_FPDFFont_GetFontData"] = createExportWrapper("FPDFFont_GetFontData");

/** @type {function(...*):?} */
var _FPDFFont_GetIsEmbedded = Module["_FPDFFont_GetIsEmbedded"] = createExportWrapper("FPDFFont_GetIsEmbedded");

/** @type {function(...*):?} */
var _FPDFFont_GetFlags = Module["_FPDFFont_GetFlags"] = createExportWrapper("FPDFFont_GetFlags");

/** @type {function(...*):?} */
var _FPDFFont_GetWeight = Module["_FPDFFont_GetWeight"] = createExportWrapper("FPDFFont_GetWeight");

/** @type {function(...*):?} */
var _FPDFFont_GetItalicAngle = Module["_FPDFFont_GetItalicAngle"] = createExportWrapper("FPDFFont_GetItalicAngle");

/** @type {function(...*):?} */
var _FPDFFont_GetAscent = Module["_FPDFFont_GetAscent"] = createExportWrapper("FPDFFont_GetAscent");

/** @type {function(...*):?} */
var _FPDFFont_GetDescent = Module["_FPDFFont_GetDescent"] = createExportWrapper("FPDFFont_GetDescent");

/** @type {function(...*):?} */
var _FPDFFont_GetGlyphWidth = Module["_FPDFFont_GetGlyphWidth"] = createExportWrapper("FPDFFont_GetGlyphWidth");

/** @type {function(...*):?} */
var _FPDFFont_GetGlyphPath = Module["_FPDFFont_GetGlyphPath"] = createExportWrapper("FPDFFont_GetGlyphPath");

/** @type {function(...*):?} */
var _FPDFGlyphPath_CountGlyphSegments = Module["_FPDFGlyphPath_CountGlyphSegments"] = createExportWrapper("FPDFGlyphPath_CountGlyphSegments");

/** @type {function(...*):?} */
var _FPDFGlyphPath_GetGlyphPathSegment = Module["_FPDFGlyphPath_GetGlyphPathSegment"] = createExportWrapper("FPDFGlyphPath_GetGlyphPathSegment");

/** @type {function(...*):?} */
var _FSDK_SetUnSpObjProcessHandler = Module["_FSDK_SetUnSpObjProcessHandler"] = createExportWrapper("FSDK_SetUnSpObjProcessHandler");

/** @type {function(...*):?} */
var _FSDK_SetTimeFunction = Module["_FSDK_SetTimeFunction"] = createExportWrapper("FSDK_SetTimeFunction");

/** @type {function(...*):?} */
var _FSDK_SetLocaltimeFunction = Module["_FSDK_SetLocaltimeFunction"] = createExportWrapper("FSDK_SetLocaltimeFunction");

/** @type {function(...*):?} */
var _FPDFDoc_GetPageMode = Module["_FPDFDoc_GetPageMode"] = createExportWrapper("FPDFDoc_GetPageMode");

/** @type {function(...*):?} */
var _FPDFPage_Flatten = Module["_FPDFPage_Flatten"] = createExportWrapper("FPDFPage_Flatten");

/** @type {function(...*):?} */
var _FPDFPage_HasFormFieldAtPoint = Module["_FPDFPage_HasFormFieldAtPoint"] = createExportWrapper("FPDFPage_HasFormFieldAtPoint");

/** @type {function(...*):?} */
var _FPDFPage_FormFieldZOrderAtPoint = Module["_FPDFPage_FormFieldZOrderAtPoint"] = createExportWrapper("FPDFPage_FormFieldZOrderAtPoint");

/** @type {function(...*):?} */
var _FPDFDOC_InitFormFillEnvironment = Module["_FPDFDOC_InitFormFillEnvironment"] = createExportWrapper("FPDFDOC_InitFormFillEnvironment");

/** @type {function(...*):?} */
var _FPDFDOC_ExitFormFillEnvironment = Module["_FPDFDOC_ExitFormFillEnvironment"] = createExportWrapper("FPDFDOC_ExitFormFillEnvironment");

/** @type {function(...*):?} */
var _FORM_OnMouseMove = Module["_FORM_OnMouseMove"] = createExportWrapper("FORM_OnMouseMove");

/** @type {function(...*):?} */
var _FORM_OnMouseWheel = Module["_FORM_OnMouseWheel"] = createExportWrapper("FORM_OnMouseWheel");

/** @type {function(...*):?} */
var _FORM_OnFocus = Module["_FORM_OnFocus"] = createExportWrapper("FORM_OnFocus");

/** @type {function(...*):?} */
var _FORM_OnLButtonDown = Module["_FORM_OnLButtonDown"] = createExportWrapper("FORM_OnLButtonDown");

/** @type {function(...*):?} */
var _FORM_OnLButtonUp = Module["_FORM_OnLButtonUp"] = createExportWrapper("FORM_OnLButtonUp");

/** @type {function(...*):?} */
var _FORM_OnLButtonDoubleClick = Module["_FORM_OnLButtonDoubleClick"] = createExportWrapper("FORM_OnLButtonDoubleClick");

/** @type {function(...*):?} */
var _FORM_OnRButtonDown = Module["_FORM_OnRButtonDown"] = createExportWrapper("FORM_OnRButtonDown");

/** @type {function(...*):?} */
var _FORM_OnRButtonUp = Module["_FORM_OnRButtonUp"] = createExportWrapper("FORM_OnRButtonUp");

/** @type {function(...*):?} */
var _FORM_OnKeyDown = Module["_FORM_OnKeyDown"] = createExportWrapper("FORM_OnKeyDown");

/** @type {function(...*):?} */
var _FORM_OnKeyUp = Module["_FORM_OnKeyUp"] = createExportWrapper("FORM_OnKeyUp");

/** @type {function(...*):?} */
var _FORM_OnChar = Module["_FORM_OnChar"] = createExportWrapper("FORM_OnChar");

/** @type {function(...*):?} */
var _FORM_GetFocusedText = Module["_FORM_GetFocusedText"] = createExportWrapper("FORM_GetFocusedText");

/** @type {function(...*):?} */
var _FORM_GetSelectedText = Module["_FORM_GetSelectedText"] = createExportWrapper("FORM_GetSelectedText");

/** @type {function(...*):?} */
var _FORM_ReplaceSelection = Module["_FORM_ReplaceSelection"] = createExportWrapper("FORM_ReplaceSelection");

/** @type {function(...*):?} */
var _FORM_SelectAllText = Module["_FORM_SelectAllText"] = createExportWrapper("FORM_SelectAllText");

/** @type {function(...*):?} */
var _FORM_CanUndo = Module["_FORM_CanUndo"] = createExportWrapper("FORM_CanUndo");

/** @type {function(...*):?} */
var _FORM_CanRedo = Module["_FORM_CanRedo"] = createExportWrapper("FORM_CanRedo");

/** @type {function(...*):?} */
var _FORM_Undo = Module["_FORM_Undo"] = createExportWrapper("FORM_Undo");

/** @type {function(...*):?} */
var _FORM_Redo = Module["_FORM_Redo"] = createExportWrapper("FORM_Redo");

/** @type {function(...*):?} */
var _FORM_ForceToKillFocus = Module["_FORM_ForceToKillFocus"] = createExportWrapper("FORM_ForceToKillFocus");

/** @type {function(...*):?} */
var _FORM_GetFocusedAnnot = Module["_FORM_GetFocusedAnnot"] = createExportWrapper("FORM_GetFocusedAnnot");

/** @type {function(...*):?} */
var _FORM_SetFocusedAnnot = Module["_FORM_SetFocusedAnnot"] = createExportWrapper("FORM_SetFocusedAnnot");

/** @type {function(...*):?} */
var _FPDF_FFLDraw = Module["_FPDF_FFLDraw"] = createExportWrapper("FPDF_FFLDraw");

/** @type {function(...*):?} */
var _FPDF_SetFormFieldHighlightColor = Module["_FPDF_SetFormFieldHighlightColor"] = createExportWrapper("FPDF_SetFormFieldHighlightColor");

/** @type {function(...*):?} */
var _FPDF_SetFormFieldHighlightAlpha = Module["_FPDF_SetFormFieldHighlightAlpha"] = createExportWrapper("FPDF_SetFormFieldHighlightAlpha");

/** @type {function(...*):?} */
var _FPDF_RemoveFormFieldHighlight = Module["_FPDF_RemoveFormFieldHighlight"] = createExportWrapper("FPDF_RemoveFormFieldHighlight");

/** @type {function(...*):?} */
var _FORM_OnAfterLoadPage = Module["_FORM_OnAfterLoadPage"] = createExportWrapper("FORM_OnAfterLoadPage");

/** @type {function(...*):?} */
var _FORM_OnBeforeClosePage = Module["_FORM_OnBeforeClosePage"] = createExportWrapper("FORM_OnBeforeClosePage");

/** @type {function(...*):?} */
var _FORM_DoDocumentJSAction = Module["_FORM_DoDocumentJSAction"] = createExportWrapper("FORM_DoDocumentJSAction");

/** @type {function(...*):?} */
var _FORM_DoDocumentOpenAction = Module["_FORM_DoDocumentOpenAction"] = createExportWrapper("FORM_DoDocumentOpenAction");

/** @type {function(...*):?} */
var _FORM_DoDocumentAAction = Module["_FORM_DoDocumentAAction"] = createExportWrapper("FORM_DoDocumentAAction");

/** @type {function(...*):?} */
var _FORM_DoPageAAction = Module["_FORM_DoPageAAction"] = createExportWrapper("FORM_DoPageAAction");

/** @type {function(...*):?} */
var _FORM_SetIndexSelected = Module["_FORM_SetIndexSelected"] = createExportWrapper("FORM_SetIndexSelected");

/** @type {function(...*):?} */
var _FORM_IsIndexSelected = Module["_FORM_IsIndexSelected"] = createExportWrapper("FORM_IsIndexSelected");

/** @type {function(...*):?} */
var _FPDFDoc_GetJavaScriptActionCount = Module["_FPDFDoc_GetJavaScriptActionCount"] = createExportWrapper("FPDFDoc_GetJavaScriptActionCount");

/** @type {function(...*):?} */
var _FPDFDoc_GetJavaScriptAction = Module["_FPDFDoc_GetJavaScriptAction"] = createExportWrapper("FPDFDoc_GetJavaScriptAction");

/** @type {function(...*):?} */
var _FPDFDoc_CloseJavaScriptAction = Module["_FPDFDoc_CloseJavaScriptAction"] = createExportWrapper("FPDFDoc_CloseJavaScriptAction");

/** @type {function(...*):?} */
var _FPDFJavaScriptAction_GetName = Module["_FPDFJavaScriptAction_GetName"] = createExportWrapper("FPDFJavaScriptAction_GetName");

/** @type {function(...*):?} */
var _FPDFJavaScriptAction_GetScript = Module["_FPDFJavaScriptAction_GetScript"] = createExportWrapper("FPDFJavaScriptAction_GetScript");

/** @type {function(...*):?} */
var _FPDF_ImportPagesByIndex = Module["_FPDF_ImportPagesByIndex"] = createExportWrapper("FPDF_ImportPagesByIndex");

/** @type {function(...*):?} */
var _FPDF_ImportPages = Module["_FPDF_ImportPages"] = createExportWrapper("FPDF_ImportPages");

/** @type {function(...*):?} */
var _FPDF_ImportNPagesToOne = Module["_FPDF_ImportNPagesToOne"] = createExportWrapper("FPDF_ImportNPagesToOne");

/** @type {function(...*):?} */
var _FPDF_NewXObjectFromPage = Module["_FPDF_NewXObjectFromPage"] = createExportWrapper("FPDF_NewXObjectFromPage");

/** @type {function(...*):?} */
var _FPDF_CloseXObject = Module["_FPDF_CloseXObject"] = createExportWrapper("FPDF_CloseXObject");

/** @type {function(...*):?} */
var _FPDF_NewFormObjectFromXObject = Module["_FPDF_NewFormObjectFromXObject"] = createExportWrapper("FPDF_NewFormObjectFromXObject");

/** @type {function(...*):?} */
var _FPDF_CopyViewerPreferences = Module["_FPDF_CopyViewerPreferences"] = createExportWrapper("FPDF_CopyViewerPreferences");

/** @type {function(...*):?} */
var _FPDF_RenderPageBitmapWithColorScheme_Start = Module["_FPDF_RenderPageBitmapWithColorScheme_Start"] = createExportWrapper("FPDF_RenderPageBitmapWithColorScheme_Start");

/** @type {function(...*):?} */
var _FPDF_RenderPageBitmap_Start = Module["_FPDF_RenderPageBitmap_Start"] = createExportWrapper("FPDF_RenderPageBitmap_Start");

/** @type {function(...*):?} */
var _FPDF_RenderPage_Continue = Module["_FPDF_RenderPage_Continue"] = createExportWrapper("FPDF_RenderPage_Continue");

/** @type {function(...*):?} */
var _FPDF_RenderPage_Close = Module["_FPDF_RenderPage_Close"] = createExportWrapper("FPDF_RenderPage_Close");

/** @type {function(...*):?} */
var _FPDF_SaveAsCopy = Module["_FPDF_SaveAsCopy"] = createExportWrapper("FPDF_SaveAsCopy");

/** @type {function(...*):?} */
var _FPDF_SaveWithVersion = Module["_FPDF_SaveWithVersion"] = createExportWrapper("FPDF_SaveWithVersion");

/** @type {function(...*):?} */
var _FPDFText_GetCharIndexFromTextIndex = Module["_FPDFText_GetCharIndexFromTextIndex"] = createExportWrapper("FPDFText_GetCharIndexFromTextIndex");

/** @type {function(...*):?} */
var _FPDFText_GetTextIndexFromCharIndex = Module["_FPDFText_GetTextIndexFromCharIndex"] = createExportWrapper("FPDFText_GetTextIndexFromCharIndex");

/** @type {function(...*):?} */
var _FPDF_GetSignatureCount = Module["_FPDF_GetSignatureCount"] = createExportWrapper("FPDF_GetSignatureCount");

/** @type {function(...*):?} */
var _FPDF_GetSignatureObject = Module["_FPDF_GetSignatureObject"] = createExportWrapper("FPDF_GetSignatureObject");

/** @type {function(...*):?} */
var _FPDFSignatureObj_GetContents = Module["_FPDFSignatureObj_GetContents"] = createExportWrapper("FPDFSignatureObj_GetContents");

/** @type {function(...*):?} */
var _FPDFSignatureObj_GetByteRange = Module["_FPDFSignatureObj_GetByteRange"] = createExportWrapper("FPDFSignatureObj_GetByteRange");

/** @type {function(...*):?} */
var _FPDFSignatureObj_GetSubFilter = Module["_FPDFSignatureObj_GetSubFilter"] = createExportWrapper("FPDFSignatureObj_GetSubFilter");

/** @type {function(...*):?} */
var _FPDFSignatureObj_GetReason = Module["_FPDFSignatureObj_GetReason"] = createExportWrapper("FPDFSignatureObj_GetReason");

/** @type {function(...*):?} */
var _FPDFSignatureObj_GetTime = Module["_FPDFSignatureObj_GetTime"] = createExportWrapper("FPDFSignatureObj_GetTime");

/** @type {function(...*):?} */
var _FPDFSignatureObj_GetDocMDPPermission = Module["_FPDFSignatureObj_GetDocMDPPermission"] = createExportWrapper("FPDFSignatureObj_GetDocMDPPermission");

/** @type {function(...*):?} */
var _FPDF_StructTree_GetForPage = Module["_FPDF_StructTree_GetForPage"] = createExportWrapper("FPDF_StructTree_GetForPage");

/** @type {function(...*):?} */
var _FPDF_StructTree_Close = Module["_FPDF_StructTree_Close"] = createExportWrapper("FPDF_StructTree_Close");

/** @type {function(...*):?} */
var _FPDF_StructTree_CountChildren = Module["_FPDF_StructTree_CountChildren"] = createExportWrapper("FPDF_StructTree_CountChildren");

/** @type {function(...*):?} */
var _FPDF_StructTree_GetChildAtIndex = Module["_FPDF_StructTree_GetChildAtIndex"] = createExportWrapper("FPDF_StructTree_GetChildAtIndex");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetAltText = Module["_FPDF_StructElement_GetAltText"] = createExportWrapper("FPDF_StructElement_GetAltText");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetActualText = Module["_FPDF_StructElement_GetActualText"] = createExportWrapper("FPDF_StructElement_GetActualText");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetID = Module["_FPDF_StructElement_GetID"] = createExportWrapper("FPDF_StructElement_GetID");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetLang = Module["_FPDF_StructElement_GetLang"] = createExportWrapper("FPDF_StructElement_GetLang");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetAttributeCount = Module["_FPDF_StructElement_GetAttributeCount"] = createExportWrapper("FPDF_StructElement_GetAttributeCount");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetAttributeAtIndex = Module["_FPDF_StructElement_GetAttributeAtIndex"] = createExportWrapper("FPDF_StructElement_GetAttributeAtIndex");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetStringAttribute = Module["_FPDF_StructElement_GetStringAttribute"] = createExportWrapper("FPDF_StructElement_GetStringAttribute");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetMarkedContentID = Module["_FPDF_StructElement_GetMarkedContentID"] = createExportWrapper("FPDF_StructElement_GetMarkedContentID");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetType = Module["_FPDF_StructElement_GetType"] = createExportWrapper("FPDF_StructElement_GetType");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetObjType = Module["_FPDF_StructElement_GetObjType"] = createExportWrapper("FPDF_StructElement_GetObjType");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetTitle = Module["_FPDF_StructElement_GetTitle"] = createExportWrapper("FPDF_StructElement_GetTitle");

/** @type {function(...*):?} */
var _FPDF_StructElement_CountChildren = Module["_FPDF_StructElement_CountChildren"] = createExportWrapper("FPDF_StructElement_CountChildren");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetChildAtIndex = Module["_FPDF_StructElement_GetChildAtIndex"] = createExportWrapper("FPDF_StructElement_GetChildAtIndex");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetParent = Module["_FPDF_StructElement_GetParent"] = createExportWrapper("FPDF_StructElement_GetParent");

/** @type {function(...*):?} */
var _FPDF_StructElement_Attr_GetCount = Module["_FPDF_StructElement_Attr_GetCount"] = createExportWrapper("FPDF_StructElement_Attr_GetCount");

/** @type {function(...*):?} */
var _FPDF_StructElement_Attr_GetName = Module["_FPDF_StructElement_Attr_GetName"] = createExportWrapper("FPDF_StructElement_Attr_GetName");

/** @type {function(...*):?} */
var _FPDF_StructElement_Attr_GetType = Module["_FPDF_StructElement_Attr_GetType"] = createExportWrapper("FPDF_StructElement_Attr_GetType");

/** @type {function(...*):?} */
var _FPDF_StructElement_Attr_GetBooleanValue = Module["_FPDF_StructElement_Attr_GetBooleanValue"] = createExportWrapper("FPDF_StructElement_Attr_GetBooleanValue");

/** @type {function(...*):?} */
var _FPDF_StructElement_Attr_GetNumberValue = Module["_FPDF_StructElement_Attr_GetNumberValue"] = createExportWrapper("FPDF_StructElement_Attr_GetNumberValue");

/** @type {function(...*):?} */
var _FPDF_StructElement_Attr_GetStringValue = Module["_FPDF_StructElement_Attr_GetStringValue"] = createExportWrapper("FPDF_StructElement_Attr_GetStringValue");

/** @type {function(...*):?} */
var _FPDF_StructElement_Attr_GetBlobValue = Module["_FPDF_StructElement_Attr_GetBlobValue"] = createExportWrapper("FPDF_StructElement_Attr_GetBlobValue");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetMarkedContentIdCount = Module["_FPDF_StructElement_GetMarkedContentIdCount"] = createExportWrapper("FPDF_StructElement_GetMarkedContentIdCount");

/** @type {function(...*):?} */
var _FPDF_StructElement_GetMarkedContentIdAtIndex = Module["_FPDF_StructElement_GetMarkedContentIdAtIndex"] = createExportWrapper("FPDF_StructElement_GetMarkedContentIdAtIndex");

/** @type {function(...*):?} */
var _FPDF_AddInstalledFont = Module["_FPDF_AddInstalledFont"] = createExportWrapper("FPDF_AddInstalledFont");

/** @type {function(...*):?} */
var _FPDF_SetSystemFontInfo = Module["_FPDF_SetSystemFontInfo"] = createExportWrapper("FPDF_SetSystemFontInfo");

/** @type {function(...*):?} */
var _FPDF_GetDefaultTTFMap = Module["_FPDF_GetDefaultTTFMap"] = createExportWrapper("FPDF_GetDefaultTTFMap");

/** @type {function(...*):?} */
var _FPDF_GetDefaultSystemFontInfo = Module["_FPDF_GetDefaultSystemFontInfo"] = createExportWrapper("FPDF_GetDefaultSystemFontInfo");

/** @type {function(...*):?} */
var _FPDF_FreeDefaultSystemFontInfo = Module["_FPDF_FreeDefaultSystemFontInfo"] = createExportWrapper("FPDF_FreeDefaultSystemFontInfo");

/** @type {function(...*):?} */
var _FPDFText_LoadPage = Module["_FPDFText_LoadPage"] = createExportWrapper("FPDFText_LoadPage");

/** @type {function(...*):?} */
var _FPDFText_ClosePage = Module["_FPDFText_ClosePage"] = createExportWrapper("FPDFText_ClosePage");

/** @type {function(...*):?} */
var _FPDFText_CountChars = Module["_FPDFText_CountChars"] = createExportWrapper("FPDFText_CountChars");

/** @type {function(...*):?} */
var _FPDFText_GetUnicode = Module["_FPDFText_GetUnicode"] = createExportWrapper("FPDFText_GetUnicode");

/** @type {function(...*):?} */
var _FPDFText_GetFontSize = Module["_FPDFText_GetFontSize"] = createExportWrapper("FPDFText_GetFontSize");

/** @type {function(...*):?} */
var _FPDFText_GetFontInfo = Module["_FPDFText_GetFontInfo"] = createExportWrapper("FPDFText_GetFontInfo");

/** @type {function(...*):?} */
var _FPDFText_GetFontWeight = Module["_FPDFText_GetFontWeight"] = createExportWrapper("FPDFText_GetFontWeight");

/** @type {function(...*):?} */
var _FPDFText_GetTextRenderMode = Module["_FPDFText_GetTextRenderMode"] = createExportWrapper("FPDFText_GetTextRenderMode");

/** @type {function(...*):?} */
var _FPDFText_GetFillColor = Module["_FPDFText_GetFillColor"] = createExportWrapper("FPDFText_GetFillColor");

/** @type {function(...*):?} */
var _FPDFText_GetStrokeColor = Module["_FPDFText_GetStrokeColor"] = createExportWrapper("FPDFText_GetStrokeColor");

/** @type {function(...*):?} */
var _FPDFText_GetCharAngle = Module["_FPDFText_GetCharAngle"] = createExportWrapper("FPDFText_GetCharAngle");

/** @type {function(...*):?} */
var _FPDFText_GetCharBox = Module["_FPDFText_GetCharBox"] = createExportWrapper("FPDFText_GetCharBox");

/** @type {function(...*):?} */
var _FPDFText_GetLooseCharBox = Module["_FPDFText_GetLooseCharBox"] = createExportWrapper("FPDFText_GetLooseCharBox");

/** @type {function(...*):?} */
var _FPDFText_GetMatrix = Module["_FPDFText_GetMatrix"] = createExportWrapper("FPDFText_GetMatrix");

/** @type {function(...*):?} */
var _FPDFText_GetCharOrigin = Module["_FPDFText_GetCharOrigin"] = createExportWrapper("FPDFText_GetCharOrigin");

/** @type {function(...*):?} */
var _FPDFText_GetCharIndexAtPos = Module["_FPDFText_GetCharIndexAtPos"] = createExportWrapper("FPDFText_GetCharIndexAtPos");

/** @type {function(...*):?} */
var _FPDFText_GetText = Module["_FPDFText_GetText"] = createExportWrapper("FPDFText_GetText");

/** @type {function(...*):?} */
var _FPDFText_CountRects = Module["_FPDFText_CountRects"] = createExportWrapper("FPDFText_CountRects");

/** @type {function(...*):?} */
var _FPDFText_GetRect = Module["_FPDFText_GetRect"] = createExportWrapper("FPDFText_GetRect");

/** @type {function(...*):?} */
var _FPDFText_GetBoundedText = Module["_FPDFText_GetBoundedText"] = createExportWrapper("FPDFText_GetBoundedText");

/** @type {function(...*):?} */
var _FPDFText_FindStart = Module["_FPDFText_FindStart"] = createExportWrapper("FPDFText_FindStart");

/** @type {function(...*):?} */
var _FPDFText_FindNext = Module["_FPDFText_FindNext"] = createExportWrapper("FPDFText_FindNext");

/** @type {function(...*):?} */
var _FPDFText_FindPrev = Module["_FPDFText_FindPrev"] = createExportWrapper("FPDFText_FindPrev");

/** @type {function(...*):?} */
var _FPDFText_GetSchResultIndex = Module["_FPDFText_GetSchResultIndex"] = createExportWrapper("FPDFText_GetSchResultIndex");

/** @type {function(...*):?} */
var _FPDFText_GetSchCount = Module["_FPDFText_GetSchCount"] = createExportWrapper("FPDFText_GetSchCount");

/** @type {function(...*):?} */
var _FPDFText_FindClose = Module["_FPDFText_FindClose"] = createExportWrapper("FPDFText_FindClose");

/** @type {function(...*):?} */
var _FPDFLink_LoadWebLinks = Module["_FPDFLink_LoadWebLinks"] = createExportWrapper("FPDFLink_LoadWebLinks");

/** @type {function(...*):?} */
var _FPDFLink_CountWebLinks = Module["_FPDFLink_CountWebLinks"] = createExportWrapper("FPDFLink_CountWebLinks");

/** @type {function(...*):?} */
var _FPDFLink_GetURL = Module["_FPDFLink_GetURL"] = createExportWrapper("FPDFLink_GetURL");

/** @type {function(...*):?} */
var _FPDFLink_CountRects = Module["_FPDFLink_CountRects"] = createExportWrapper("FPDFLink_CountRects");

/** @type {function(...*):?} */
var _FPDFLink_GetRect = Module["_FPDFLink_GetRect"] = createExportWrapper("FPDFLink_GetRect");

/** @type {function(...*):?} */
var _FPDFLink_GetTextRange = Module["_FPDFLink_GetTextRange"] = createExportWrapper("FPDFLink_GetTextRange");

/** @type {function(...*):?} */
var _FPDFLink_CloseWebLinks = Module["_FPDFLink_CloseWebLinks"] = createExportWrapper("FPDFLink_CloseWebLinks");

/** @type {function(...*):?} */
var _FPDFPage_GetDecodedThumbnailData = Module["_FPDFPage_GetDecodedThumbnailData"] = createExportWrapper("FPDFPage_GetDecodedThumbnailData");

/** @type {function(...*):?} */
var _FPDFPage_GetRawThumbnailData = Module["_FPDFPage_GetRawThumbnailData"] = createExportWrapper("FPDFPage_GetRawThumbnailData");

/** @type {function(...*):?} */
var _FPDFPage_GetThumbnailAsBitmap = Module["_FPDFPage_GetThumbnailAsBitmap"] = createExportWrapper("FPDFPage_GetThumbnailAsBitmap");

/** @type {function(...*):?} */
var _FPDFPage_SetMediaBox = Module["_FPDFPage_SetMediaBox"] = createExportWrapper("FPDFPage_SetMediaBox");

/** @type {function(...*):?} */
var _FPDFPage_SetCropBox = Module["_FPDFPage_SetCropBox"] = createExportWrapper("FPDFPage_SetCropBox");

/** @type {function(...*):?} */
var _FPDFPage_SetBleedBox = Module["_FPDFPage_SetBleedBox"] = createExportWrapper("FPDFPage_SetBleedBox");

/** @type {function(...*):?} */
var _FPDFPage_SetTrimBox = Module["_FPDFPage_SetTrimBox"] = createExportWrapper("FPDFPage_SetTrimBox");

/** @type {function(...*):?} */
var _FPDFPage_SetArtBox = Module["_FPDFPage_SetArtBox"] = createExportWrapper("FPDFPage_SetArtBox");

/** @type {function(...*):?} */
var _FPDFPage_GetMediaBox = Module["_FPDFPage_GetMediaBox"] = createExportWrapper("FPDFPage_GetMediaBox");

/** @type {function(...*):?} */
var _FPDFPage_GetCropBox = Module["_FPDFPage_GetCropBox"] = createExportWrapper("FPDFPage_GetCropBox");

/** @type {function(...*):?} */
var _FPDFPage_GetBleedBox = Module["_FPDFPage_GetBleedBox"] = createExportWrapper("FPDFPage_GetBleedBox");

/** @type {function(...*):?} */
var _FPDFPage_GetTrimBox = Module["_FPDFPage_GetTrimBox"] = createExportWrapper("FPDFPage_GetTrimBox");

/** @type {function(...*):?} */
var _FPDFPage_GetArtBox = Module["_FPDFPage_GetArtBox"] = createExportWrapper("FPDFPage_GetArtBox");

/** @type {function(...*):?} */
var _FPDFPage_TransFormWithClip = Module["_FPDFPage_TransFormWithClip"] = createExportWrapper("FPDFPage_TransFormWithClip");

/** @type {function(...*):?} */
var _FPDFPageObj_TransformClipPath = Module["_FPDFPageObj_TransformClipPath"] = createExportWrapper("FPDFPageObj_TransformClipPath");

/** @type {function(...*):?} */
var _FPDFPageObj_GetClipPath = Module["_FPDFPageObj_GetClipPath"] = createExportWrapper("FPDFPageObj_GetClipPath");

/** @type {function(...*):?} */
var _FPDFClipPath_CountPaths = Module["_FPDFClipPath_CountPaths"] = createExportWrapper("FPDFClipPath_CountPaths");

/** @type {function(...*):?} */
var _FPDFClipPath_CountPathSegments = Module["_FPDFClipPath_CountPathSegments"] = createExportWrapper("FPDFClipPath_CountPathSegments");

/** @type {function(...*):?} */
var _FPDFClipPath_GetPathSegment = Module["_FPDFClipPath_GetPathSegment"] = createExportWrapper("FPDFClipPath_GetPathSegment");

/** @type {function(...*):?} */
var _FPDF_CreateClipPath = Module["_FPDF_CreateClipPath"] = createExportWrapper("FPDF_CreateClipPath");

/** @type {function(...*):?} */
var _FPDF_DestroyClipPath = Module["_FPDF_DestroyClipPath"] = createExportWrapper("FPDF_DestroyClipPath");

/** @type {function(...*):?} */
var _FPDFPage_InsertClipPath = Module["_FPDFPage_InsertClipPath"] = createExportWrapper("FPDFPage_InsertClipPath");

/** @type {function(...*):?} */
var _FPDF_InitLibrary = Module["_FPDF_InitLibrary"] = createExportWrapper("FPDF_InitLibrary");

/** @type {function(...*):?} */
var _memset = Module["_memset"] = createExportWrapper("memset");

/** @type {function(...*):?} */
var _malloc = Module["_malloc"] = createExportWrapper("malloc");

/** @type {function(...*):?} */
var _saveSetjmp = Module["_saveSetjmp"] = createExportWrapper("saveSetjmp");

/** @type {function(...*):?} */
var _free = Module["_free"] = createExportWrapper("free");

/** @type {function(...*):?} */
var _FPDF_DestroyLibrary = Module["_FPDF_DestroyLibrary"] = createExportWrapper("FPDF_DestroyLibrary");

/** @type {function(...*):?} */
var _FPDF_SetSandBoxPolicy = Module["_FPDF_SetSandBoxPolicy"] = createExportWrapper("FPDF_SetSandBoxPolicy");

/** @type {function(...*):?} */
var _FPDF_LoadDocument = Module["_FPDF_LoadDocument"] = createExportWrapper("FPDF_LoadDocument");

/** @type {function(...*):?} */
var _FPDF_GetFormType = Module["_FPDF_GetFormType"] = createExportWrapper("FPDF_GetFormType");

/** @type {function(...*):?} */
var _FPDF_LoadXFA = Module["_FPDF_LoadXFA"] = createExportWrapper("FPDF_LoadXFA");

/** @type {function(...*):?} */
var _FPDF_LoadMemDocument = Module["_FPDF_LoadMemDocument"] = createExportWrapper("FPDF_LoadMemDocument");

/** @type {function(...*):?} */
var _FPDF_LoadMemDocument64 = Module["_FPDF_LoadMemDocument64"] = createExportWrapper("FPDF_LoadMemDocument64");

/** @type {function(...*):?} */
var _FPDF_LoadCustomDocument = Module["_FPDF_LoadCustomDocument"] = createExportWrapper("FPDF_LoadCustomDocument");

/** @type {function(...*):?} */
var _FPDF_GetFileVersion = Module["_FPDF_GetFileVersion"] = createExportWrapper("FPDF_GetFileVersion");

/** @type {function(...*):?} */
var _FPDF_DocumentHasValidCrossReferenceTable = Module["_FPDF_DocumentHasValidCrossReferenceTable"] = createExportWrapper("FPDF_DocumentHasValidCrossReferenceTable");

/** @type {function(...*):?} */
var _FPDF_GetDocPermissions = Module["_FPDF_GetDocPermissions"] = createExportWrapper("FPDF_GetDocPermissions");

/** @type {function(...*):?} */
var _FPDF_GetSecurityHandlerRevision = Module["_FPDF_GetSecurityHandlerRevision"] = createExportWrapper("FPDF_GetSecurityHandlerRevision");

/** @type {function(...*):?} */
var _FPDF_GetPageCount = Module["_FPDF_GetPageCount"] = createExportWrapper("FPDF_GetPageCount");

/** @type {function(...*):?} */
var _FPDF_LoadPage = Module["_FPDF_LoadPage"] = createExportWrapper("FPDF_LoadPage");

/** @type {function(...*):?} */
var _FPDF_GetPageWidthF = Module["_FPDF_GetPageWidthF"] = createExportWrapper("FPDF_GetPageWidthF");

/** @type {function(...*):?} */
var _FPDF_GetPageWidth = Module["_FPDF_GetPageWidth"] = createExportWrapper("FPDF_GetPageWidth");

/** @type {function(...*):?} */
var _FPDF_GetPageHeightF = Module["_FPDF_GetPageHeightF"] = createExportWrapper("FPDF_GetPageHeightF");

/** @type {function(...*):?} */
var _FPDF_GetPageHeight = Module["_FPDF_GetPageHeight"] = createExportWrapper("FPDF_GetPageHeight");

/** @type {function(...*):?} */
var _FPDF_GetPageBoundingBox = Module["_FPDF_GetPageBoundingBox"] = createExportWrapper("FPDF_GetPageBoundingBox");

/** @type {function(...*):?} */
var _FPDF_RenderPageBitmap = Module["_FPDF_RenderPageBitmap"] = createExportWrapper("FPDF_RenderPageBitmap");

/** @type {function(...*):?} */
var _FPDF_RenderPageBitmapWithMatrix = Module["_FPDF_RenderPageBitmapWithMatrix"] = createExportWrapper("FPDF_RenderPageBitmapWithMatrix");

/** @type {function(...*):?} */
var _FPDF_ClosePage = Module["_FPDF_ClosePage"] = createExportWrapper("FPDF_ClosePage");

/** @type {function(...*):?} */
var _FPDF_CloseDocument = Module["_FPDF_CloseDocument"] = createExportWrapper("FPDF_CloseDocument");

/** @type {function(...*):?} */
var _FPDF_GetLastError = Module["_FPDF_GetLastError"] = createExportWrapper("FPDF_GetLastError");

/** @type {function(...*):?} */
var _FPDF_DeviceToPage = Module["_FPDF_DeviceToPage"] = createExportWrapper("FPDF_DeviceToPage");

/** @type {function(...*):?} */
var _FPDF_PageToDevice = Module["_FPDF_PageToDevice"] = createExportWrapper("FPDF_PageToDevice");

/** @type {function(...*):?} */
var _FPDFBitmap_Create = Module["_FPDFBitmap_Create"] = createExportWrapper("FPDFBitmap_Create");

/** @type {function(...*):?} */
var _FPDFBitmap_CreateEx = Module["_FPDFBitmap_CreateEx"] = createExportWrapper("FPDFBitmap_CreateEx");

/** @type {function(...*):?} */
var _FPDFBitmap_GetFormat = Module["_FPDFBitmap_GetFormat"] = createExportWrapper("FPDFBitmap_GetFormat");

/** @type {function(...*):?} */
var _FPDFBitmap_FillRect = Module["_FPDFBitmap_FillRect"] = createExportWrapper("FPDFBitmap_FillRect");

/** @type {function(...*):?} */
var _FPDFBitmap_GetBuffer = Module["_FPDFBitmap_GetBuffer"] = createExportWrapper("FPDFBitmap_GetBuffer");

/** @type {function(...*):?} */
var _FPDFBitmap_GetWidth = Module["_FPDFBitmap_GetWidth"] = createExportWrapper("FPDFBitmap_GetWidth");

/** @type {function(...*):?} */
var _FPDFBitmap_GetHeight = Module["_FPDFBitmap_GetHeight"] = createExportWrapper("FPDFBitmap_GetHeight");

/** @type {function(...*):?} */
var _FPDFBitmap_GetStride = Module["_FPDFBitmap_GetStride"] = createExportWrapper("FPDFBitmap_GetStride");

/** @type {function(...*):?} */
var _FPDFBitmap_Destroy = Module["_FPDFBitmap_Destroy"] = createExportWrapper("FPDFBitmap_Destroy");

/** @type {function(...*):?} */
var _FPDF_GetPageSizeByIndexF = Module["_FPDF_GetPageSizeByIndexF"] = createExportWrapper("FPDF_GetPageSizeByIndexF");

/** @type {function(...*):?} */
var _FPDF_GetPageSizeByIndex = Module["_FPDF_GetPageSizeByIndex"] = createExportWrapper("FPDF_GetPageSizeByIndex");

/** @type {function(...*):?} */
var _FPDF_VIEWERREF_GetPrintScaling = Module["_FPDF_VIEWERREF_GetPrintScaling"] = createExportWrapper("FPDF_VIEWERREF_GetPrintScaling");

/** @type {function(...*):?} */
var _FPDF_VIEWERREF_GetNumCopies = Module["_FPDF_VIEWERREF_GetNumCopies"] = createExportWrapper("FPDF_VIEWERREF_GetNumCopies");

/** @type {function(...*):?} */
var _FPDF_VIEWERREF_GetPrintPageRange = Module["_FPDF_VIEWERREF_GetPrintPageRange"] = createExportWrapper("FPDF_VIEWERREF_GetPrintPageRange");

/** @type {function(...*):?} */
var _FPDF_VIEWERREF_GetPrintPageRangeCount = Module["_FPDF_VIEWERREF_GetPrintPageRangeCount"] = createExportWrapper("FPDF_VIEWERREF_GetPrintPageRangeCount");

/** @type {function(...*):?} */
var _FPDF_VIEWERREF_GetPrintPageRangeElement = Module["_FPDF_VIEWERREF_GetPrintPageRangeElement"] = createExportWrapper("FPDF_VIEWERREF_GetPrintPageRangeElement");

/** @type {function(...*):?} */
var _FPDF_VIEWERREF_GetDuplex = Module["_FPDF_VIEWERREF_GetDuplex"] = createExportWrapper("FPDF_VIEWERREF_GetDuplex");

/** @type {function(...*):?} */
var _FPDF_VIEWERREF_GetName = Module["_FPDF_VIEWERREF_GetName"] = createExportWrapper("FPDF_VIEWERREF_GetName");

/** @type {function(...*):?} */
var _FPDF_CountNamedDests = Module["_FPDF_CountNamedDests"] = createExportWrapper("FPDF_CountNamedDests");

/** @type {function(...*):?} */
var _FPDF_GetNamedDestByName = Module["_FPDF_GetNamedDestByName"] = createExportWrapper("FPDF_GetNamedDestByName");

/** @type {function(...*):?} */
var _FPDF_GetNamedDest = Module["_FPDF_GetNamedDest"] = createExportWrapper("FPDF_GetNamedDest");

/** @type {function(...*):?} */
var _FPDF_GetXFAPacketCount = Module["_FPDF_GetXFAPacketCount"] = createExportWrapper("FPDF_GetXFAPacketCount");

/** @type {function(...*):?} */
var _FPDF_GetXFAPacketName = Module["_FPDF_GetXFAPacketName"] = createExportWrapper("FPDF_GetXFAPacketName");

/** @type {function(...*):?} */
var _FPDF_GetXFAPacketContent = Module["_FPDF_GetXFAPacketContent"] = createExportWrapper("FPDF_GetXFAPacketContent");

/** @type {function(...*):?} */
var _FPDF_GetTrailerEnds = Module["_FPDF_GetTrailerEnds"] = createExportWrapper("FPDF_GetTrailerEnds");

/** @type {function(...*):?} */
var ___errno_location = Module["___errno_location"] = createExportWrapper("__errno_location");

/** @type {function(...*):?} */
var ___getTypeName = Module["___getTypeName"] = createExportWrapper("__getTypeName");

/** @type {function(...*):?} */
var ___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = createExportWrapper("__embind_register_native_and_builtin_types");

/** @type {function(...*):?} */
var _emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = function() {
  return (_emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = Module["asm"]["emscripten_stack_get_end"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _fflush = Module["_fflush"] = createExportWrapper("fflush");

/** @type {function(...*):?} */
var __get_tzname = Module["__get_tzname"] = createExportWrapper("_get_tzname");

/** @type {function(...*):?} */
var __get_daylight = Module["__get_daylight"] = createExportWrapper("_get_daylight");

/** @type {function(...*):?} */
var __get_timezone = Module["__get_timezone"] = createExportWrapper("_get_timezone");

/** @type {function(...*):?} */
var stackSave = Module["stackSave"] = createExportWrapper("stackSave");

/** @type {function(...*):?} */
var stackRestore = Module["stackRestore"] = createExportWrapper("stackRestore");

/** @type {function(...*):?} */
var stackAlloc = Module["stackAlloc"] = createExportWrapper("stackAlloc");

/** @type {function(...*):?} */
var _emscripten_stack_init = Module["_emscripten_stack_init"] = function() {
  return (_emscripten_stack_init = Module["_emscripten_stack_init"] = Module["asm"]["emscripten_stack_init"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = function() {
  return (_emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = Module["asm"]["emscripten_stack_get_free"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _setThrew = Module["_setThrew"] = createExportWrapper("setThrew");

/** @type {function(...*):?} */
var ___cxa_demangle = Module["___cxa_demangle"] = createExportWrapper("__cxa_demangle");

/** @type {function(...*):?} */
var _memalign = Module["_memalign"] = createExportWrapper("memalign");

/** @type {function(...*):?} */
var _emscripten_builtin_malloc = Module["_emscripten_builtin_malloc"] = createExportWrapper("emscripten_builtin_malloc");

/** @type {function(...*):?} */
var _emscripten_builtin_free = Module["_emscripten_builtin_free"] = createExportWrapper("emscripten_builtin_free");

/** @type {function(...*):?} */
var _emscripten_builtin_memalign = Module["_emscripten_builtin_memalign"] = createExportWrapper("emscripten_builtin_memalign");

/** @type {function(...*):?} */
var dynCall_ji = Module["dynCall_ji"] = createExportWrapper("dynCall_ji");

/** @type {function(...*):?} */
var dynCall_jij = Module["dynCall_jij"] = createExportWrapper("dynCall_jij");

/** @type {function(...*):?} */
var dynCall_iiiij = Module["dynCall_iiiij"] = createExportWrapper("dynCall_iiiij");

/** @type {function(...*):?} */
var dynCall_iij = Module["dynCall_iij"] = createExportWrapper("dynCall_iij");

/** @type {function(...*):?} */
var dynCall_iiiji = Module["dynCall_iiiji"] = createExportWrapper("dynCall_iiiji");

/** @type {function(...*):?} */
var dynCall_jji = Module["dynCall_jji"] = createExportWrapper("dynCall_jji");

/** @type {function(...*):?} */
var dynCall_iji = Module["dynCall_iji"] = createExportWrapper("dynCall_iji");

/** @type {function(...*):?} */
var dynCall_viijii = Module["dynCall_viijii"] = createExportWrapper("dynCall_viijii");

/** @type {function(...*):?} */
var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");

/** @type {function(...*):?} */
var dynCall_iiji = Module["dynCall_iiji"] = createExportWrapper("dynCall_iiji");

/** @type {function(...*):?} */
var dynCall_iiiiij = Module["dynCall_iiiiij"] = createExportWrapper("dynCall_iiiiij");

/** @type {function(...*):?} */
var dynCall_iiiiijj = Module["dynCall_iiiiijj"] = createExportWrapper("dynCall_iiiiijj");

/** @type {function(...*):?} */
var dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = createExportWrapper("dynCall_iiiiiijj");

/** @type {function(...*):?} */
var dynCall_viji = Module["dynCall_viji"] = createExportWrapper("dynCall_viji");


function invoke_vii(index,a1,a2) {
  var sp = stackSave();
  try {
    wasmTable.get(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_ii(index,a1) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_viii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    wasmTable.get(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_vi(index,a1) {
  var sp = stackSave();
  try {
    wasmTable.get(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    wasmTable.get(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_v(index) {
  var sp = stackSave();
  try {
    wasmTable.get(index)();
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}




// === Auto-generated postamble setup entry stuff ===

Module["intArrayFromString"] = intArrayFromString;
Module["intArrayToString"] = intArrayToString;
Module["ccall"] = ccall;
Module["cwrap"] = cwrap;
Module["setValue"] = setValue;
Module["getValue"] = getValue;
if (!Object.getOwnPropertyDescriptor(Module, "allocate")) Module["allocate"] = function() { abort("'allocate' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString")) Module["UTF8ArrayToString"] = function() { abort("'UTF8ArrayToString' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["UTF8ToString"] = UTF8ToString;
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array")) Module["stringToUTF8Array"] = function() { abort("'stringToUTF8Array' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["stringToUTF8"] = stringToUTF8;
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8")) Module["lengthBytesUTF8"] = function() { abort("'lengthBytesUTF8' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPreRun")) Module["addOnPreRun"] = function() { abort("'addOnPreRun' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnInit")) Module["addOnInit"] = function() { abort("'addOnInit' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPreMain")) Module["addOnPreMain"] = function() { abort("'addOnPreMain' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnExit")) Module["addOnExit"] = function() { abort("'addOnExit' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPostRun")) Module["addOnPostRun"] = function() { abort("'addOnPostRun' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["writeStringToMemory"] = writeStringToMemory;
Module["writeArrayToMemory"] = writeArrayToMemory;
Module["writeAsciiToMemory"] = writeAsciiToMemory;
if (!Object.getOwnPropertyDescriptor(Module, "addRunDependency")) Module["addRunDependency"] = function() { abort("'addRunDependency' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "removeRunDependency")) Module["removeRunDependency"] = function() { abort("'removeRunDependency' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createFolder")) Module["FS_createFolder"] = function() { abort("'FS_createFolder' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createPath")) Module["FS_createPath"] = function() { abort("'FS_createPath' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createDataFile")) Module["FS_createDataFile"] = function() { abort("'FS_createDataFile' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createPreloadedFile")) Module["FS_createPreloadedFile"] = function() { abort("'FS_createPreloadedFile' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createLazyFile")) Module["FS_createLazyFile"] = function() { abort("'FS_createLazyFile' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createLink")) Module["FS_createLink"] = function() { abort("'FS_createLink' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createDevice")) Module["FS_createDevice"] = function() { abort("'FS_createDevice' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_unlink")) Module["FS_unlink"] = function() { abort("'FS_unlink' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "getLEB")) Module["getLEB"] = function() { abort("'getLEB' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFunctionTables")) Module["getFunctionTables"] = function() { abort("'getFunctionTables' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "alignFunctionTables")) Module["alignFunctionTables"] = function() { abort("'alignFunctionTables' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerFunctions")) Module["registerFunctions"] = function() { abort("'registerFunctions' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addFunction")) Module["addFunction"] = function() { abort("'addFunction' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "removeFunction")) Module["removeFunction"] = function() { abort("'removeFunction' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function() { abort("'getFuncWrapper' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "prettyPrint")) Module["prettyPrint"] = function() { abort("'prettyPrint' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function() { abort("'dynCall' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getCompilerSetting")) Module["getCompilerSetting"] = function() { abort("'getCompilerSetting' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "print")) Module["print"] = function() { abort("'print' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "printErr")) Module["printErr"] = function() { abort("'printErr' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getTempRet0")) Module["getTempRet0"] = function() { abort("'getTempRet0' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setTempRet0")) Module["setTempRet0"] = function() { abort("'setTempRet0' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "callMain")) Module["callMain"] = function() { abort("'callMain' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "abort")) Module["abort"] = function() { abort("'abort' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToNewUTF8")) Module["stringToNewUTF8"] = function() { abort("'stringToNewUTF8' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setFileTime")) Module["setFileTime"] = function() { abort("'setFileTime' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscripten_realloc_buffer")) Module["emscripten_realloc_buffer"] = function() { abort("'emscripten_realloc_buffer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ENV")) Module["ENV"] = function() { abort("'ENV' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_CODES")) Module["ERRNO_CODES"] = function() { abort("'ERRNO_CODES' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_MESSAGES")) Module["ERRNO_MESSAGES"] = function() { abort("'ERRNO_MESSAGES' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setErrNo")) Module["setErrNo"] = function() { abort("'setErrNo' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "inetPton4")) Module["inetPton4"] = function() { abort("'inetPton4' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "inetNtop4")) Module["inetNtop4"] = function() { abort("'inetNtop4' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "inetPton6")) Module["inetPton6"] = function() { abort("'inetPton6' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "inetNtop6")) Module["inetNtop6"] = function() { abort("'inetNtop6' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readSockaddr")) Module["readSockaddr"] = function() { abort("'readSockaddr' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeSockaddr")) Module["writeSockaddr"] = function() { abort("'writeSockaddr' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "DNS")) Module["DNS"] = function() { abort("'DNS' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getHostByName")) Module["getHostByName"] = function() { abort("'getHostByName' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GAI_ERRNO_MESSAGES")) Module["GAI_ERRNO_MESSAGES"] = function() { abort("'GAI_ERRNO_MESSAGES' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Protocols")) Module["Protocols"] = function() { abort("'Protocols' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Sockets")) Module["Sockets"] = function() { abort("'Sockets' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getRandomDevice")) Module["getRandomDevice"] = function() { abort("'getRandomDevice' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "traverseStack")) Module["traverseStack"] = function() { abort("'traverseStack' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UNWIND_CACHE")) Module["UNWIND_CACHE"] = function() { abort("'UNWIND_CACHE' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "withBuiltinMalloc")) Module["withBuiltinMalloc"] = function() { abort("'withBuiltinMalloc' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgsArray")) Module["readAsmConstArgsArray"] = function() { abort("'readAsmConstArgsArray' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgs")) Module["readAsmConstArgs"] = function() { abort("'readAsmConstArgs' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "mainThreadEM_ASM")) Module["mainThreadEM_ASM"] = function() { abort("'mainThreadEM_ASM' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jstoi_q")) Module["jstoi_q"] = function() { abort("'jstoi_q' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jstoi_s")) Module["jstoi_s"] = function() { abort("'jstoi_s' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getExecutableName")) Module["getExecutableName"] = function() { abort("'getExecutableName' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "listenOnce")) Module["listenOnce"] = function() { abort("'listenOnce' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "autoResumeAudioContext")) Module["autoResumeAudioContext"] = function() { abort("'autoResumeAudioContext' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "dynCallLegacy")) Module["dynCallLegacy"] = function() { abort("'dynCallLegacy' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getDynCaller")) Module["getDynCaller"] = function() { abort("'getDynCaller' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function() { abort("'dynCall' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "callRuntimeCallbacks")) Module["callRuntimeCallbacks"] = function() { abort("'callRuntimeCallbacks' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "runtimeKeepaliveCounter")) Module["runtimeKeepaliveCounter"] = function() { abort("'runtimeKeepaliveCounter' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "keepRuntimeAlive")) Module["keepRuntimeAlive"] = function() { abort("'keepRuntimeAlive' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "runtimeKeepalivePush")) Module["runtimeKeepalivePush"] = function() { abort("'runtimeKeepalivePush' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "runtimeKeepalivePop")) Module["runtimeKeepalivePop"] = function() { abort("'runtimeKeepalivePop' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "callUserCallback")) Module["callUserCallback"] = function() { abort("'callUserCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "maybeExit")) Module["maybeExit"] = function() { abort("'maybeExit' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "asmjsMangle")) Module["asmjsMangle"] = function() { abort("'asmjsMangle' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "reallyNegative")) Module["reallyNegative"] = function() { abort("'reallyNegative' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "unSign")) Module["unSign"] = function() { abort("'unSign' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "reSign")) Module["reSign"] = function() { abort("'reSign' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "formatString")) Module["formatString"] = function() { abort("'formatString' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PATH")) Module["PATH"] = function() { abort("'PATH' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PATH_FS")) Module["PATH_FS"] = function() { abort("'PATH_FS' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SYSCALLS")) Module["SYSCALLS"] = function() { abort("'SYSCALLS' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "syscallMmap2")) Module["syscallMmap2"] = function() { abort("'syscallMmap2' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "syscallMunmap")) Module["syscallMunmap"] = function() { abort("'syscallMunmap' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getSocketFromFD")) Module["getSocketFromFD"] = function() { abort("'getSocketFromFD' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getSocketAddress")) Module["getSocketAddress"] = function() { abort("'getSocketAddress' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "JSEvents")) Module["JSEvents"] = function() { abort("'JSEvents' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerKeyEventCallback")) Module["registerKeyEventCallback"] = function() { abort("'registerKeyEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "specialHTMLTargets")) Module["specialHTMLTargets"] = function() { abort("'specialHTMLTargets' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "maybeCStringToJsString")) Module["maybeCStringToJsString"] = function() { abort("'maybeCStringToJsString' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "findEventTarget")) Module["findEventTarget"] = function() { abort("'findEventTarget' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "findCanvasEventTarget")) Module["findCanvasEventTarget"] = function() { abort("'findCanvasEventTarget' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getBoundingClientRect")) Module["getBoundingClientRect"] = function() { abort("'getBoundingClientRect' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "fillMouseEventData")) Module["fillMouseEventData"] = function() { abort("'fillMouseEventData' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerMouseEventCallback")) Module["registerMouseEventCallback"] = function() { abort("'registerMouseEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerWheelEventCallback")) Module["registerWheelEventCallback"] = function() { abort("'registerWheelEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerUiEventCallback")) Module["registerUiEventCallback"] = function() { abort("'registerUiEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerFocusEventCallback")) Module["registerFocusEventCallback"] = function() { abort("'registerFocusEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "fillDeviceOrientationEventData")) Module["fillDeviceOrientationEventData"] = function() { abort("'fillDeviceOrientationEventData' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerDeviceOrientationEventCallback")) Module["registerDeviceOrientationEventCallback"] = function() { abort("'registerDeviceOrientationEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "fillDeviceMotionEventData")) Module["fillDeviceMotionEventData"] = function() { abort("'fillDeviceMotionEventData' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerDeviceMotionEventCallback")) Module["registerDeviceMotionEventCallback"] = function() { abort("'registerDeviceMotionEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "screenOrientation")) Module["screenOrientation"] = function() { abort("'screenOrientation' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "fillOrientationChangeEventData")) Module["fillOrientationChangeEventData"] = function() { abort("'fillOrientationChangeEventData' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerOrientationChangeEventCallback")) Module["registerOrientationChangeEventCallback"] = function() { abort("'registerOrientationChangeEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "fillFullscreenChangeEventData")) Module["fillFullscreenChangeEventData"] = function() { abort("'fillFullscreenChangeEventData' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerFullscreenChangeEventCallback")) Module["registerFullscreenChangeEventCallback"] = function() { abort("'registerFullscreenChangeEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerRestoreOldStyle")) Module["registerRestoreOldStyle"] = function() { abort("'registerRestoreOldStyle' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "hideEverythingExceptGivenElement")) Module["hideEverythingExceptGivenElement"] = function() { abort("'hideEverythingExceptGivenElement' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "restoreHiddenElements")) Module["restoreHiddenElements"] = function() { abort("'restoreHiddenElements' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setLetterbox")) Module["setLetterbox"] = function() { abort("'setLetterbox' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "currentFullscreenStrategy")) Module["currentFullscreenStrategy"] = function() { abort("'currentFullscreenStrategy' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "restoreOldWindowedStyle")) Module["restoreOldWindowedStyle"] = function() { abort("'restoreOldWindowedStyle' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "softFullscreenResizeWebGLRenderTarget")) Module["softFullscreenResizeWebGLRenderTarget"] = function() { abort("'softFullscreenResizeWebGLRenderTarget' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "doRequestFullscreen")) Module["doRequestFullscreen"] = function() { abort("'doRequestFullscreen' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "fillPointerlockChangeEventData")) Module["fillPointerlockChangeEventData"] = function() { abort("'fillPointerlockChangeEventData' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerPointerlockChangeEventCallback")) Module["registerPointerlockChangeEventCallback"] = function() { abort("'registerPointerlockChangeEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerPointerlockErrorEventCallback")) Module["registerPointerlockErrorEventCallback"] = function() { abort("'registerPointerlockErrorEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "requestPointerLock")) Module["requestPointerLock"] = function() { abort("'requestPointerLock' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "fillVisibilityChangeEventData")) Module["fillVisibilityChangeEventData"] = function() { abort("'fillVisibilityChangeEventData' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerVisibilityChangeEventCallback")) Module["registerVisibilityChangeEventCallback"] = function() { abort("'registerVisibilityChangeEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerTouchEventCallback")) Module["registerTouchEventCallback"] = function() { abort("'registerTouchEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "fillGamepadEventData")) Module["fillGamepadEventData"] = function() { abort("'fillGamepadEventData' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerGamepadEventCallback")) Module["registerGamepadEventCallback"] = function() { abort("'registerGamepadEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerBeforeUnloadEventCallback")) Module["registerBeforeUnloadEventCallback"] = function() { abort("'registerBeforeUnloadEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "fillBatteryEventData")) Module["fillBatteryEventData"] = function() { abort("'fillBatteryEventData' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "battery")) Module["battery"] = function() { abort("'battery' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerBatteryEventCallback")) Module["registerBatteryEventCallback"] = function() { abort("'registerBatteryEventCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setCanvasElementSize")) Module["setCanvasElementSize"] = function() { abort("'setCanvasElementSize' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getCanvasElementSize")) Module["getCanvasElementSize"] = function() { abort("'getCanvasElementSize' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "polyfillSetImmediate")) Module["polyfillSetImmediate"] = function() { abort("'polyfillSetImmediate' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "demangle")) Module["demangle"] = function() { abort("'demangle' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "demangleAll")) Module["demangleAll"] = function() { abort("'demangleAll' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jsStackTrace")) Module["jsStackTrace"] = function() { abort("'jsStackTrace' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getEnvStrings")) Module["getEnvStrings"] = function() { abort("'getEnvStrings' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "checkWasiClock")) Module["checkWasiClock"] = function() { abort("'checkWasiClock' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64")) Module["writeI53ToI64"] = function() { abort("'writeI53ToI64' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Clamped")) Module["writeI53ToI64Clamped"] = function() { abort("'writeI53ToI64Clamped' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Signaling")) Module["writeI53ToI64Signaling"] = function() { abort("'writeI53ToI64Signaling' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Clamped")) Module["writeI53ToU64Clamped"] = function() { abort("'writeI53ToU64Clamped' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Signaling")) Module["writeI53ToU64Signaling"] = function() { abort("'writeI53ToU64Signaling' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readI53FromI64")) Module["readI53FromI64"] = function() { abort("'readI53FromI64' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readI53FromU64")) Module["readI53FromU64"] = function() { abort("'readI53FromU64' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "convertI32PairToI53")) Module["convertI32PairToI53"] = function() { abort("'convertI32PairToI53' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "convertU32PairToI53")) Module["convertU32PairToI53"] = function() { abort("'convertU32PairToI53' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "uncaughtExceptionCount")) Module["uncaughtExceptionCount"] = function() { abort("'uncaughtExceptionCount' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exceptionLast")) Module["exceptionLast"] = function() { abort("'exceptionLast' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exceptionCaught")) Module["exceptionCaught"] = function() { abort("'exceptionCaught' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfoAttrs")) Module["ExceptionInfoAttrs"] = function() { abort("'ExceptionInfoAttrs' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfo")) Module["ExceptionInfo"] = function() { abort("'ExceptionInfo' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "CatchInfo")) Module["CatchInfo"] = function() { abort("'CatchInfo' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exception_addRef")) Module["exception_addRef"] = function() { abort("'exception_addRef' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exception_decRef")) Module["exception_decRef"] = function() { abort("'exception_decRef' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Browser")) Module["Browser"] = function() { abort("'Browser' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "funcWrappers")) Module["funcWrappers"] = function() { abort("'funcWrappers' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function() { abort("'getFuncWrapper' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setMainLoop")) Module["setMainLoop"] = function() { abort("'setMainLoop' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "FS")) Module["FS"] = function() { abort("'FS' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "mmapAlloc")) Module["mmapAlloc"] = function() { abort("'mmapAlloc' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "MEMFS")) Module["MEMFS"] = function() { abort("'MEMFS' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "TTY")) Module["TTY"] = function() { abort("'TTY' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PIPEFS")) Module["PIPEFS"] = function() { abort("'PIPEFS' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SOCKFS")) Module["SOCKFS"] = function() { abort("'SOCKFS' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "_setNetworkCallback")) Module["_setNetworkCallback"] = function() { abort("'_setNetworkCallback' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "tempFixedLengthArray")) Module["tempFixedLengthArray"] = function() { abort("'tempFixedLengthArray' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "miniTempWebGLFloatBuffers")) Module["miniTempWebGLFloatBuffers"] = function() { abort("'miniTempWebGLFloatBuffers' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "heapObjectForWebGLType")) Module["heapObjectForWebGLType"] = function() { abort("'heapObjectForWebGLType' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "heapAccessShiftForWebGLHeap")) Module["heapAccessShiftForWebGLHeap"] = function() { abort("'heapAccessShiftForWebGLHeap' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GL")) Module["GL"] = function() { abort("'GL' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGet")) Module["emscriptenWebGLGet"] = function() { abort("'emscriptenWebGLGet' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "computeUnpackAlignedImageSize")) Module["computeUnpackAlignedImageSize"] = function() { abort("'computeUnpackAlignedImageSize' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetTexPixelData")) Module["emscriptenWebGLGetTexPixelData"] = function() { abort("'emscriptenWebGLGetTexPixelData' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetUniform")) Module["emscriptenWebGLGetUniform"] = function() { abort("'emscriptenWebGLGetUniform' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "webglGetUniformLocation")) Module["webglGetUniformLocation"] = function() { abort("'webglGetUniformLocation' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "webglPrepareUniformLocationsBeforeFirstUse")) Module["webglPrepareUniformLocationsBeforeFirstUse"] = function() { abort("'webglPrepareUniformLocationsBeforeFirstUse' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "webglGetLeftBracePos")) Module["webglGetLeftBracePos"] = function() { abort("'webglGetLeftBracePos' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetVertexAttrib")) Module["emscriptenWebGLGetVertexAttrib"] = function() { abort("'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeGLArray")) Module["writeGLArray"] = function() { abort("'writeGLArray' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "AL")) Module["AL"] = function() { abort("'AL' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_unicode")) Module["SDL_unicode"] = function() { abort("'SDL_unicode' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_ttfContext")) Module["SDL_ttfContext"] = function() { abort("'SDL_ttfContext' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_audio")) Module["SDL_audio"] = function() { abort("'SDL_audio' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL")) Module["SDL"] = function() { abort("'SDL' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_gfx")) Module["SDL_gfx"] = function() { abort("'SDL_gfx' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLUT")) Module["GLUT"] = function() { abort("'GLUT' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "EGL")) Module["EGL"] = function() { abort("'EGL' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLFW_Window")) Module["GLFW_Window"] = function() { abort("'GLFW_Window' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLFW")) Module["GLFW"] = function() { abort("'GLFW' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLEW")) Module["GLEW"] = function() { abort("'GLEW' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "IDBStore")) Module["IDBStore"] = function() { abort("'IDBStore' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "runAndAbortIfError")) Module["runAndAbortIfError"] = function() { abort("'runAndAbortIfError' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emval_handle_array")) Module["emval_handle_array"] = function() { abort("'emval_handle_array' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emval_free_list")) Module["emval_free_list"] = function() { abort("'emval_free_list' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emval_symbols")) Module["emval_symbols"] = function() { abort("'emval_symbols' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "init_emval")) Module["init_emval"] = function() { abort("'init_emval' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "count_emval_handles")) Module["count_emval_handles"] = function() { abort("'count_emval_handles' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "get_first_emval")) Module["get_first_emval"] = function() { abort("'get_first_emval' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getStringOrSymbol")) Module["getStringOrSymbol"] = function() { abort("'getStringOrSymbol' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "requireHandle")) Module["requireHandle"] = function() { abort("'requireHandle' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emval_newers")) Module["emval_newers"] = function() { abort("'emval_newers' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "craftEmvalAllocator")) Module["craftEmvalAllocator"] = function() { abort("'craftEmvalAllocator' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emval_get_global")) Module["emval_get_global"] = function() { abort("'emval_get_global' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emval_methodCallers")) Module["emval_methodCallers"] = function() { abort("'emval_methodCallers' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "InternalError")) Module["InternalError"] = function() { abort("'InternalError' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "BindingError")) Module["BindingError"] = function() { abort("'BindingError' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UnboundTypeError")) Module["UnboundTypeError"] = function() { abort("'UnboundTypeError' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PureVirtualError")) Module["PureVirtualError"] = function() { abort("'PureVirtualError' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "init_embind")) Module["init_embind"] = function() { abort("'init_embind' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "throwInternalError")) Module["throwInternalError"] = function() { abort("'throwInternalError' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "throwBindingError")) Module["throwBindingError"] = function() { abort("'throwBindingError' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "throwUnboundTypeError")) Module["throwUnboundTypeError"] = function() { abort("'throwUnboundTypeError' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ensureOverloadTable")) Module["ensureOverloadTable"] = function() { abort("'ensureOverloadTable' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exposePublicSymbol")) Module["exposePublicSymbol"] = function() { abort("'exposePublicSymbol' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "replacePublicSymbol")) Module["replacePublicSymbol"] = function() { abort("'replacePublicSymbol' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "extendError")) Module["extendError"] = function() { abort("'extendError' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "createNamedFunction")) Module["createNamedFunction"] = function() { abort("'createNamedFunction' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registeredInstances")) Module["registeredInstances"] = function() { abort("'registeredInstances' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getBasestPointer")) Module["getBasestPointer"] = function() { abort("'getBasestPointer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerInheritedInstance")) Module["registerInheritedInstance"] = function() { abort("'registerInheritedInstance' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "unregisterInheritedInstance")) Module["unregisterInheritedInstance"] = function() { abort("'unregisterInheritedInstance' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getInheritedInstance")) Module["getInheritedInstance"] = function() { abort("'getInheritedInstance' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getInheritedInstanceCount")) Module["getInheritedInstanceCount"] = function() { abort("'getInheritedInstanceCount' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getLiveInheritedInstances")) Module["getLiveInheritedInstances"] = function() { abort("'getLiveInheritedInstances' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registeredTypes")) Module["registeredTypes"] = function() { abort("'registeredTypes' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "awaitingDependencies")) Module["awaitingDependencies"] = function() { abort("'awaitingDependencies' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "typeDependencies")) Module["typeDependencies"] = function() { abort("'typeDependencies' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registeredPointers")) Module["registeredPointers"] = function() { abort("'registeredPointers' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerType")) Module["registerType"] = function() { abort("'registerType' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "whenDependentTypesAreResolved")) Module["whenDependentTypesAreResolved"] = function() { abort("'whenDependentTypesAreResolved' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "embind_charCodes")) Module["embind_charCodes"] = function() { abort("'embind_charCodes' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "embind_init_charCodes")) Module["embind_init_charCodes"] = function() { abort("'embind_init_charCodes' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readLatin1String")) Module["readLatin1String"] = function() { abort("'readLatin1String' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getTypeName")) Module["getTypeName"] = function() { abort("'getTypeName' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "heap32VectorToArray")) Module["heap32VectorToArray"] = function() { abort("'heap32VectorToArray' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "requireRegisteredType")) Module["requireRegisteredType"] = function() { abort("'requireRegisteredType' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getShiftFromSize")) Module["getShiftFromSize"] = function() { abort("'getShiftFromSize' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "integerReadValueFromPointer")) Module["integerReadValueFromPointer"] = function() { abort("'integerReadValueFromPointer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "enumReadValueFromPointer")) Module["enumReadValueFromPointer"] = function() { abort("'enumReadValueFromPointer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "floatReadValueFromPointer")) Module["floatReadValueFromPointer"] = function() { abort("'floatReadValueFromPointer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "simpleReadValueFromPointer")) Module["simpleReadValueFromPointer"] = function() { abort("'simpleReadValueFromPointer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "runDestructors")) Module["runDestructors"] = function() { abort("'runDestructors' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "new_")) Module["new_"] = function() { abort("'new_' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "craftInvokerFunction")) Module["craftInvokerFunction"] = function() { abort("'craftInvokerFunction' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "embind__requireFunction")) Module["embind__requireFunction"] = function() { abort("'embind__requireFunction' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "tupleRegistrations")) Module["tupleRegistrations"] = function() { abort("'tupleRegistrations' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "structRegistrations")) Module["structRegistrations"] = function() { abort("'structRegistrations' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "genericPointerToWireType")) Module["genericPointerToWireType"] = function() { abort("'genericPointerToWireType' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "constNoSmartPtrRawPointerToWireType")) Module["constNoSmartPtrRawPointerToWireType"] = function() { abort("'constNoSmartPtrRawPointerToWireType' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "nonConstNoSmartPtrRawPointerToWireType")) Module["nonConstNoSmartPtrRawPointerToWireType"] = function() { abort("'nonConstNoSmartPtrRawPointerToWireType' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "init_RegisteredPointer")) Module["init_RegisteredPointer"] = function() { abort("'init_RegisteredPointer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer")) Module["RegisteredPointer"] = function() { abort("'RegisteredPointer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_getPointee")) Module["RegisteredPointer_getPointee"] = function() { abort("'RegisteredPointer_getPointee' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_destructor")) Module["RegisteredPointer_destructor"] = function() { abort("'RegisteredPointer_destructor' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_deleteObject")) Module["RegisteredPointer_deleteObject"] = function() { abort("'RegisteredPointer_deleteObject' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_fromWireType")) Module["RegisteredPointer_fromWireType"] = function() { abort("'RegisteredPointer_fromWireType' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "runDestructor")) Module["runDestructor"] = function() { abort("'runDestructor' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "releaseClassHandle")) Module["releaseClassHandle"] = function() { abort("'releaseClassHandle' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "finalizationGroup")) Module["finalizationGroup"] = function() { abort("'finalizationGroup' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "detachFinalizer_deps")) Module["detachFinalizer_deps"] = function() { abort("'detachFinalizer_deps' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "detachFinalizer")) Module["detachFinalizer"] = function() { abort("'detachFinalizer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "attachFinalizer")) Module["attachFinalizer"] = function() { abort("'attachFinalizer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "makeClassHandle")) Module["makeClassHandle"] = function() { abort("'makeClassHandle' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "init_ClassHandle")) Module["init_ClassHandle"] = function() { abort("'init_ClassHandle' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle")) Module["ClassHandle"] = function() { abort("'ClassHandle' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_isAliasOf")) Module["ClassHandle_isAliasOf"] = function() { abort("'ClassHandle_isAliasOf' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "throwInstanceAlreadyDeleted")) Module["throwInstanceAlreadyDeleted"] = function() { abort("'throwInstanceAlreadyDeleted' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_clone")) Module["ClassHandle_clone"] = function() { abort("'ClassHandle_clone' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_delete")) Module["ClassHandle_delete"] = function() { abort("'ClassHandle_delete' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "deletionQueue")) Module["deletionQueue"] = function() { abort("'deletionQueue' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_isDeleted")) Module["ClassHandle_isDeleted"] = function() { abort("'ClassHandle_isDeleted' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_deleteLater")) Module["ClassHandle_deleteLater"] = function() { abort("'ClassHandle_deleteLater' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "flushPendingDeletes")) Module["flushPendingDeletes"] = function() { abort("'flushPendingDeletes' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "delayFunction")) Module["delayFunction"] = function() { abort("'delayFunction' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setDelayFunction")) Module["setDelayFunction"] = function() { abort("'setDelayFunction' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "RegisteredClass")) Module["RegisteredClass"] = function() { abort("'RegisteredClass' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "shallowCopyInternalPointer")) Module["shallowCopyInternalPointer"] = function() { abort("'shallowCopyInternalPointer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "downcastPointer")) Module["downcastPointer"] = function() { abort("'downcastPointer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "upcastPointer")) Module["upcastPointer"] = function() { abort("'upcastPointer' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "validateThis")) Module["validateThis"] = function() { abort("'validateThis' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "char_0")) Module["char_0"] = function() { abort("'char_0' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "char_9")) Module["char_9"] = function() { abort("'char_9' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "makeLegalFunctionName")) Module["makeLegalFunctionName"] = function() { abort("'makeLegalFunctionName' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "warnOnce")) Module["warnOnce"] = function() { abort("'warnOnce' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackSave")) Module["stackSave"] = function() { abort("'stackSave' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackRestore")) Module["stackRestore"] = function() { abort("'stackRestore' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackAlloc")) Module["stackAlloc"] = function() { abort("'stackAlloc' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["AsciiToString"] = AsciiToString;
if (!Object.getOwnPropertyDescriptor(Module, "stringToAscii")) Module["stringToAscii"] = function() { abort("'stringToAscii' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["UTF16ToString"] = UTF16ToString;
Module["stringToUTF16"] = stringToUTF16;
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16")) Module["lengthBytesUTF16"] = function() { abort("'lengthBytesUTF16' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["UTF32ToString"] = UTF32ToString;
Module["stringToUTF32"] = stringToUTF32;
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32")) Module["lengthBytesUTF32"] = function() { abort("'lengthBytesUTF32' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8")) Module["allocateUTF8"] = function() { abort("'allocateUTF8' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8OnStack")) Module["allocateUTF8OnStack"] = function() { abort("'allocateUTF8OnStack' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["writeStackCookie"] = writeStackCookie;
Module["checkStackCookie"] = checkStackCookie;
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NORMAL")) Object.defineProperty(Module, "ALLOC_NORMAL", { configurable: true, get: function() { abort("'ALLOC_NORMAL' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK")) Object.defineProperty(Module, "ALLOC_STACK", { configurable: true, get: function() { abort("'ALLOC_STACK' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)") } });

var calledRun;

/**
 * @constructor
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}

var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  _emscripten_stack_init();
  writeStackCookie();
}

/** @type {function(Array=)} */
function run(args) {
  args = args || arguments_;

  if (runDependencies > 0) {
    return;
  }

  stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    readyPromiseResolve(Module);
    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    assert(!Module['_main'], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}
Module['run'] = run;

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = function(x) {
    has = true;
  }
  try { // it doesn't matter if it fails
    var flush = Module['_fflush'];
    if (flush) flush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach(function(name) {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty && tty.output && tty.output.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.');
  }
}

/** @param {boolean|number=} implicit */
function exit(status, implicit) {
  EXITSTATUS = status;

  checkUnflushedContent();

  // if this is just main exit-ing implicitly, and the status is 0, then we
  // don't need to do anything here and can just leave. if the status is
  // non-zero, though, then we need to report it.
  // (we may have warned about this earlier, if a situation justifies doing so)
  if (implicit && keepRuntimeAlive() && status === 0) {
    return;
  }

  if (keepRuntimeAlive()) {
    // if exit() was called, we may warn the user if the runtime isn't actually being shut down
    if (!implicit) {
      var msg = 'program exited (with status: ' + status + '), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)';
      readyPromiseReject(msg);
      err(msg);
    }
  } else {

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);

    ABORT = true;
  }

  quit_(status, new ExitStatus(status));
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

run();







  return createPdfiumModule.ready
}
);
})();
export default createPdfiumModule;