(function(){
    var script = {
 "horizontalAlign": "left",
 "height": "100%",
 "id": "rootPlayer",
 "scrollBarColor": "#000000",
 "vrPolyfillScale": 1,
 "mobileMipmappingEnabled": false,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.MainViewer",
  "this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541",
  "this.Image_662ED9D9_7178_37D1_41BC_B29C3F34DB16",
  "this.Container_6792CE20_7179_CC6A_41D0_E818C4D261B5",
  "this.Container_C6C04894_C81E_A06E_41E2_CFA3F601EC35",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "start": "this.playAudioList([this.audio_DED95086_CFDA_B5B9_41E1_B6DCE9E8C4EA]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_679D1E20_7179_CC6A_41CF_662941DB817D].forEach(function(component) { component.set('visible', false); }) }",
 "desktopMipmappingEnabled": false,
 "paddingLeft": 0,
 "minHeight": 20,
 "backgroundPreloadEnabled": true,
 "buttonToggleFullscreen": "this.IconButton_679D1E20_7179_CC6A_41CF_662941DB817D",
 "scripts": {
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "existsKey": function(key){  return key in window; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "registerKey": function(key, value){  window[key] = value; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "unregisterKey": function(key){  delete window[key]; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "class": "Player",
 "borderSize": 0,
 "contentOpaque": false,
 "defaultVRPointer": "laser",
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "minWidth": 20,
 "downloadEnabled": true,
 "borderRadius": 0,
 "layout": "absolute",
 "buttonToggleMute": "this.IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0",
 "verticalAlign": "top",
 "gap": 10,
 "width": "100%",
 "propagateClick": false,
 "shadow": false,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "data": {
  "name": "Player18184"
 },
 "paddingTop": 0,
 "mouseWheelEnabled": true,
 "definitions": [{
 "thumbnailUrl": "media/video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC_t.jpg",
 "label": "video_77971F4C_67B3_362C_41D0_6D5F39F7A280",
 "scaleMode": "fit_inside",
 "width": 2986,
 "loop": false,
 "id": "video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC",
 "class": "Video",
 "height": 1680,
 "video": {
  "width": 2986,
  "mp4Url": "media/video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC.mp4",
  "class": "VideoResource",
  "height": 1680
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_camera",
 "automaticZoomSpeed": 10
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_A44997AA_BEB2_BD4D_41B0_33A1398521F4",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid30641ECB_216D_D958_4185_EA1444F1E3FA"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window30372"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "items": [
  {
   "media": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_camera"
  },
  {
   "media": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_camera"
  },
  {
   "media": "this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_camera"
  },
  {
   "media": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_camera"
  },
  {
   "media": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_camera"
  },
  {
   "media": "this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_camera"
  },
  {
   "media": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116_camera"
  },
  {
   "media": "this.video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 7, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 7)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_camera"
  },
  {
   "media": "this.video_AB72F879_BE95_7D22_41D9_61CE633D38DD",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 9, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 9)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_camera"
  },
  {
   "media": "this.panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_camera"
  },
  {
   "media": "this.panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_camera"
  },
  {
   "media": "this.panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_camera"
  },
  {
   "media": "this.panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_camera"
  },
  {
   "media": "this.panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_camera"
  },
  {
   "media": "this.panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_camera"
  },
  {
   "media": "this.panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_camera"
  },
  {
   "media": "this.panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "levels": [
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_0.jpg",
   "width": 13013,
   "class": "ImageResourceLevel",
   "height": 17751
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_1.jpg",
   "width": 12010,
   "class": "ImageResourceLevel",
   "height": 16384
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_2.jpg",
   "width": 6005,
   "class": "ImageResourceLevel",
   "height": 8192
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_3.jpg",
   "width": 3002,
   "class": "ImageResourceLevel",
   "height": 4096
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_4.jpg",
   "width": 1501,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_5.jpg",
   "width": 750,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_6.jpg",
   "width": 375,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ],
 "id": "ImageResource_A94824E1_BEE1_B065_41CC_505D04DA2E35",
 "class": "ImageResource"
},
{
 "levels": [
  {
   "url": "media/popup_CA43744F_C559_694A_41E3_6A94DB282096_0_0.jpg",
   "width": 1187,
   "class": "ImageResourceLevel",
   "height": 1600
  },
  {
   "url": "media/popup_CA43744F_C559_694A_41E3_6A94DB282096_0_1.jpg",
   "width": 759,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_CA43744F_C559_694A_41E3_6A94DB282096_0_2.jpg",
   "width": 379,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ],
 "id": "ImageResource_CA43544F_C559_694A_41B9_3C1104FC2891",
 "class": "ImageResource"
},
{
 "items": [
  {
   "media": "this.panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4",
   "player": "this.viewer_uid306E1EC6_216D_D948_41B1_67D2EB9DF4E0PanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_camera"
  }
 ],
 "id": "playList_306ECEC6_216D_D948_41BE_4E502B122B66",
 "class": "PlayList"
},
{
 "vfov": 180,
 "label": "2",
 "id": "panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "adjacentPanoramas": [
  {
   "backwardYaw": -89,
   "yaw": 88.48,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4"
  },
  {
   "backwardYaw": 125.22,
   "yaw": -104.33,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525"
  },
  {
   "backwardYaw": -0.83,
   "yaw": 90.31,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116"
  }
 ],
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "hfovMin": "400%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_t.jpg",
 "overlays": [
  "this.overlay_CAC67DCD_C549_BB4E_41C5_3CF13C58EEDB",
  "this.overlay_CABE589A_C547_79CA_41E8_391573AB0C7A",
  "this.overlay_CAE19CF2_C547_D955_41D9_9112F9CEC59E",
  "this.overlay_D5C829C0_C547_5BB6_41E1_0C9B58377FB2",
  "this.overlay_CA9510AC_C558_E9CE_41C3_A41D5EF48930",
  "this.overlay_CA933A5B_C559_B94B_41DC_B587DA0D153D",
  "this.overlay_CA0B160C_C558_A8CE_41D1_FE8D55B30963",
  "this.overlay_CA8B0AD6_C558_B95D_41E4_58F264E4C75B",
  "this.overlay_CA589D5A_C55B_BB4A_41E3_4F4E800E94EA",
  "this.overlay_CAFD7E23_C55B_58FA_41D3_0CC50F82DA5A",
  "this.overlay_CA7DF477_C559_695B_41DD_EC1D84E678D4",
  "this.overlay_CA35DD8A_C55B_5BCA_41E7_0DCC2394A201",
  "this.popup_CA352DA7_C549_BBFA_41E6_161386B7E332",
  "this.popup_CAEFACD1_C547_D957_41D6_AE6C75408208",
  "this.popup_CAE3408C_C558_E9CE_41D2_099A88CECC9A",
  "this.popup_CA43744F_C559_694A_41E3_6A94DB282096",
  "this.popup_CA122D68_C55B_5B76_41BC_163ECE009C39",
  "this.overlay_D140E706_C579_68BA_41E3_CE7135259DF3",
  "this.overlay_F8040099_F718_A41F_41D3_6D244066365E"
 ],
 "class": "Panorama"
},
{
 "vfov": 180,
 "partial": false,
 "id": "panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "label": "plaza bolivar",
 "pitch": 0,
 "hfovMin": "400%",
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_t.jpg",
 "class": "Panorama"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "autoplay": true,
 "class": "MediaAudio",
 "id": "audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A",
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A.ogg",
  "mp3Url": "media/audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A.mp3"
 },
 "data": {
  "label": "ElevenLabs_2024-09-04T20_00_48_Charlie_pre_s100_sb75_se0_b_m2"
 }
},
{
 "items": [
  {
   "media": "this.panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98",
   "player": "this.viewer_uid30666ECB_216D_D958_41B5_D502B52685F7PanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_camera"
  }
 ],
 "id": "playList_30663ECB_216D_D958_41BB_864F0CDF0D19",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C",
   "player": "this.viewer_uid30641ECB_216D_D958_4185_EA1444F1E3FAPanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_camera"
  }
 ],
 "id": "playList_3064BECB_216D_D958_41AA_625FBEBE111C",
 "class": "PlayList"
},
{
 "autoplay": true,
 "class": "MediaAudio",
 "id": "audio_B2EEA171_BFED_65BB_41D3_9F6255B03B1E",
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_B2EEA171_BFED_65BB_41D3_9F6255B03B1E.ogg",
  "mp3Url": "media/audio_B2EEA171_BFED_65BB_41D3_9F6255B03B1E.mp3"
 },
 "data": {
  "label": "relaxing-music-vol1-124477 (mp3cut.net)"
 }
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_4.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 767
   }
  ]
 },
 "popupDistance": 100,
 "yaw": -169.57,
 "hfov": 20.85,
 "pitch": 0.69
},
{
 "initialPosition": {
  "yaw": 88.45,
  "class": "PanoramaCameraPosition",
  "hfov": 91,
  "pitch": 1.13
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 80.08,
  "class": "PanoramaCameraPosition",
  "hfov": 101,
  "pitch": -2.14
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 9.02,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_camera",
 "manualRotationSpeed": 612,
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "6",
 "id": "panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "adjacentPanoramas": [
  {
   "backwardYaw": -98.16,
   "yaw": -92.13,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD"
  }
 ],
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "hfovMin": "400%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_t.jpg"
  }
 ],
 "thumbnailUrl": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_t.jpg",
 "overlays": [
  "this.overlay_A18AC4B2_BF76_1976_41C1_3449A2C14288",
  "this.overlay_99A56090_BF32_3932_4181_B8C673A66BE9",
  "this.popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5",
  "this.popup_936400A0_BF3E_7912_41D9_2DED96CB6E81",
  "this.overlay_91E59851_BF2D_E932_4185_722D58DF4B27",
  "this.overlay_DDC6386A_CD05_0C99_41DF_B08A4474BEE0"
 ],
 "class": "Panorama"
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_2B59F6D8_2165_E978_41B3_4E39748CDF4A",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "scrollBarVisible": "rollOver",
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "closeButtonPaddingTop": 5,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "class": "Window",
 "bodyPaddingTop": 0,
 "shadowSpread": 1,
 "modal": true,
 "backgroundColor": [],
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "verticalAlign": "middle",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "closeButtonRollOverIconLineWidth": 5,
 "closeButtonPressedIconLineWidth": 5,
 "closeButtonRollOverIconColor": "#666666",
 "bodyPaddingBottom": 0,
 "closeButtonRollOverBorderColor": "#000000",
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "closeButtonRollOverBorderSize": 0,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid305EDECE_216D_D958_41B3_6CA04AAC00DF"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "closeButtonBackgroundOpacity": 0.3,
 "closeButtonPaddingRight": 5,
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "closeButtonPressedBackgroundOpacity": 0.3,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPaddingBottom": 5,
 "closeButtonBorderRadius": 0,
 "closeButtonPressedBorderColor": "#000000",
 "borderRadius": 5,
 "closeButtonPaddingLeft": 5,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "headerBackgroundOpacity": 0,
 "closeButtonBorderSize": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 5,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window382"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#888888",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "closeButtonPressedBorderSize": 0
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_A474FCEC_BEB2_ACC6_41CB_181217D91186",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid30653ECB_216D_D958_41B5_99D5D205ABE3"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window29434"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "initialPosition": {
  "yaw": -91.52,
  "class": "PanoramaCameraPosition",
  "hfov": 106,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30FFBF09_216D_D8DB_41AE_B95E382BD831",
 "automaticZoomSpeed": 10
},
{
 "levels": [
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_0.jpg",
   "width": 12089,
   "class": "ImageResourceLevel",
   "height": 9067
  },
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_1.jpg",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 6144
  },
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_2.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 3072
  },
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_3.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1536
  },
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_4.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 768
  },
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_5.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 384
  }
 ],
 "id": "ImageResource_CA1DDD68_C55B_5B76_41E1_7549F89DFD79",
 "class": "ImageResource"
},
{
 "vfov": 180,
 "partial": false,
 "id": "panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "label": "Street View 360",
 "pitch": 0,
 "hfovMin": "400%",
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_t.jpg",
 "class": "Panorama"
},
{
 "levels": [
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_0.jpg",
   "width": 8651,
   "class": "ImageResourceLevel",
   "height": 6487
  },
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_1.jpg",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 6142
  },
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_2.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 3071
  },
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_3.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1535
  },
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_4.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 767
  },
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_5.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 383
  }
 ],
 "id": "ImageResource_9BD48771_BF72_27F5_41E7_DAF1962D5253",
 "class": "ImageResource"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_4.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 767
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 89.52,
 "hfov": 66.09,
 "pitch": 2.54
},
{
 "items": [
  {
   "media": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C",
   "player": "this.viewer_uid306D4EC7_216D_D948_41B1_D4C5C1947420PanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_camera"
  }
 ],
 "id": "playList_306D3EC7_216D_D948_41C0_5CE43D77E74C",
 "class": "PlayList"
},
{
 "levels": [
  {
   "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_0.jpg",
   "width": 3333,
   "class": "ImageResourceLevel",
   "height": 5123
  },
  {
   "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_1.jpg",
   "width": 2664,
   "class": "ImageResourceLevel",
   "height": 4096
  },
  {
   "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_2.jpg",
   "width": 1332,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_3.jpg",
   "width": 666,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_4.jpg",
   "width": 333,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ],
 "id": "ImageResource_AAD06D2A_BF35_EB17_41E2_E456BD624EBA",
 "class": "ImageResource"
},
{
 "items": [
  {
   "media": "this.video_AB72F879_BE95_7D22_41D9_61CE633D38DD",
   "start": "this.viewer_uid306DBEC7_216D_D948_4186_0DC5D7DA937BVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_30437ED9_216D_D97B_41B3_37D63C59A1CF, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_30437ED9_216D_D97B_41B3_37D63C59A1CF, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid306DBEC7_216D_D948_4186_0DC5D7DA937BVideoPlayer)",
   "player": "this.viewer_uid306DBEC7_216D_D948_4186_0DC5D7DA937BVideoPlayer"
  }
 ],
 "id": "PlayList_30437ED9_216D_D97B_41B3_37D63C59A1CF",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A904160D_BF21_53BD_41CD_A66E25EE7D42",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_4.jpg",
    "width": 747,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 115.82,
 "hfov": 5.33,
 "pitch": -7.3
},
{
 "levels": [
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_0.jpg",
   "width": 9815,
   "class": "ImageResourceLevel",
   "height": 7043
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_1.jpg",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 5878
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_2.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 2939
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_3.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1469
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_4.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 734
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_5.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 367
  }
 ],
 "id": "ImageResource_AADB0D2E_BF35_EB6F_41E1_A71D8747E3ED",
 "class": "ImageResource"
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_CAEAFA9A_C558_B9CA_41D9_0CD75738D73C",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid306C3EC7_216D_D957_41AF_1EC54B772D9B"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window3767"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "duration": 100,
 "id": "effect_66561DD8_7178_4FDA_41B5_A74B9759BE30",
 "class": "SlideOutEffect",
 "easing": "linear",
 "to": "bottom"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_3.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 650
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 84.88,
 "hfov": 8.23,
 "pitch": -8.04
},
{
 "levels": [
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_0.jpg",
   "width": 8651,
   "class": "ImageResourceLevel",
   "height": 6487
  },
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_1.jpg",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 6142
  },
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_2.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 3071
  },
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_3.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1535
  },
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_4.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 767
  },
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_5.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 383
  }
 ],
 "id": "ImageResource_9861A25C_BF52_1932_41E3_B0581D3C0D64",
 "class": "ImageResource"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_CA43744F_C559_694A_41E3_6A94DB282096",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_CA43744F_C559_694A_41E3_6A94DB282096_0_1.jpg",
    "width": 759,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 175.17,
 "hfov": 22.47,
 "pitch": 0.56
},
{
 "initialPosition": {
  "yaw": 150.93,
  "class": "PanoramaCameraPosition",
  "hfov": 103,
  "pitch": -3.42
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_camera",
 "automaticZoomSpeed": 10
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D_0_2.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 597
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 93.3,
 "hfov": 9.03,
 "pitch": -9.26
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_A91DC6B4_BE96_FF45_41E2_2C723BE0957D",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid30609EC9_216D_D958_41AC_7F44C6D88FD2"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window25034"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "vfov": 180,
 "partial": false,
 "id": "panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "label": "bellas artes",
 "pitch": 0,
 "hfovMin": "400%",
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_t.jpg",
 "class": "Panorama"
},
{
 "items": [
  {
   "media": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116",
   "player": "this.viewer_uid30609EC9_216D_D958_41AC_7F44C6D88FD2PanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116_camera"
  }
 ],
 "id": "playList_30617EC9_216D_D958_419D_BC029D55E2A8",
 "class": "PlayList"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "class": "VideoPlayer"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "hideDuration": 500,
 "autoplay": true,
 "id": "popup_CAEFACD1_C547_D957_41D6_AE6C75408208",
 "rotationX": 0,
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "class": "PopupPanoramaOverlay",
 "popupDistance": 100,
 "yaw": 93.03,
 "hfov": 3.07,
 "pitch": -29.27,
 "video": {
  "width": 2986,
  "mp4Url": "media/video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC.mp4",
  "class": "VideoResource",
  "height": 1680
 }
},
{
 "autoplay": true,
 "class": "MediaAudio",
 "id": "audio_DED95086_CFDA_B5B9_41E1_B6DCE9E8C4EA",
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_DED95086_CFDA_B5B9_41E1_B6DCE9E8C4EA.ogg",
  "mp3Url": "media/audio_DED95086_CFDA_B5B9_41E1_B6DCE9E8C4EA.mp3"
 },
 "data": {
  "label": "relaxing-music-vol1-124477 (mp3cut.net)"
 }
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A62E6F27_BF33_E71E_414D_7F4159A130D3",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_5.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 714
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 109.18,
 "hfov": 7.87,
 "pitch": 9.58
},
{
 "items": [
  {
   "media": "this.panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E",
   "player": "this.viewer_uid3066DECA_216D_D958_4192_BB1F98FF911FPanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_camera"
  }
 ],
 "id": "playList_30674ECA_216D_D958_41B5_E4A9A77D902A",
 "class": "PlayList"
},
{
 "levels": [
  {
   "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_0.jpg",
   "width": 5000,
   "class": "ImageResourceLevel",
   "height": 6804
  },
  {
   "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_1.jpg",
   "width": 3009,
   "class": "ImageResourceLevel",
   "height": 4096
  },
  {
   "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_2.jpg",
   "width": 1504,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_3.jpg",
   "width": 752,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_4.jpg",
   "width": 376,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ],
 "id": "ImageResource_AAD1BD2A_BF35_EB16_41E0_62D0B58DD2A8",
 "class": "ImageResource"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_4.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 767
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 171.08,
 "hfov": 17.33,
 "pitch": 0.57
},
{
 "levels": [
  {
   "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_0.jpg",
   "width": 4372,
   "class": "ImageResourceLevel",
   "height": 2778
  },
  {
   "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_1.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 2602
  },
  {
   "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_2.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1301
  },
  {
   "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_3.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 650
  },
  {
   "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_4.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 325
  }
 ],
 "id": "ImageResource_AAD75D2B_BF35_EB15_4196_1BE8E0A63146",
 "class": "ImageResource"
},
{
 "initialPosition": {
  "yaw": 58.46,
  "class": "PanoramaCameraPosition",
  "hfov": 105,
  "pitch": -1.19
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_camera",
 "automaticZoomSpeed": 10
},
{
 "levels": [
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_0.jpg",
   "width": 12800,
   "class": "ImageResourceLevel",
   "height": 17474
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_1.jpg",
   "width": 12001,
   "class": "ImageResourceLevel",
   "height": 16384
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_2.jpg",
   "width": 6000,
   "class": "ImageResourceLevel",
   "height": 8192
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_3.jpg",
   "width": 3000,
   "class": "ImageResourceLevel",
   "height": 4096
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_4.jpg",
   "width": 1500,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_5.jpg",
   "width": 750,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_6.jpg",
   "width": 375,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ],
 "id": "ImageResource_301BAEF0_216D_D949_41B8_3E13135E5474",
 "class": "ImageResource"
},
{
 "initialPosition": {
  "yaw": -140.11,
  "class": "PanoramaCameraPosition",
  "hfov": 101,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 9.02,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30D98F1F_216D_D8F8_41A9_7696158A832A",
 "manualRotationSpeed": 612,
 "automaticZoomSpeed": 10
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_2A798978_2165_FB38_41BB_B77B6A572F71",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "scrollBarVisible": "rollOver",
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "closeButtonPaddingTop": 5,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "class": "Window",
 "bodyPaddingTop": 0,
 "shadowSpread": 1,
 "modal": true,
 "backgroundColor": [],
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "verticalAlign": "middle",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "closeButtonRollOverIconLineWidth": 5,
 "closeButtonPressedIconLineWidth": 5,
 "closeButtonRollOverIconColor": "#666666",
 "bodyPaddingBottom": 0,
 "closeButtonRollOverBorderColor": "#000000",
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "closeButtonRollOverBorderSize": 0,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid306F2EC6_216D_D948_41AC_76221BB287DF"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "closeButtonBackgroundOpacity": 0.3,
 "closeButtonPaddingRight": 5,
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "closeButtonPressedBackgroundOpacity": 0.3,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPaddingBottom": 5,
 "closeButtonBorderRadius": 0,
 "closeButtonPressedBorderColor": "#000000",
 "borderRadius": 5,
 "closeButtonPaddingLeft": 5,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "headerBackgroundOpacity": 0,
 "closeButtonBorderSize": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 5,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window415"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#888888",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "closeButtonPressedBorderSize": 0
},
{
 "vfov": 180,
 "partial": false,
 "id": "panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "label": "teatro",
 "pitch": 0,
 "hfovMin": "400%",
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_t.jpg",
 "class": "Panorama"
},
{
 "levels": [
  {
   "url": "media/popup_CA352DA7_C549_BBFA_41E6_161386B7E332_0_0.jpg",
   "width": 1772,
   "class": "ImageResourceLevel",
   "height": 709
  },
  {
   "url": "media/popup_CA352DA7_C549_BBFA_41E6_161386B7E332_0_1.jpg",
   "width": 1023,
   "class": "ImageResourceLevel",
   "height": 409
  },
  {
   "url": "media/popup_CA352DA7_C549_BBFA_41E6_161386B7E332_0_2.jpg",
   "width": 511,
   "class": "ImageResourceLevel",
   "height": 204
  }
 ],
 "id": "ImageResource_CA352DA7_C549_BBFA_41D5_C91348F4C13C",
 "class": "ImageResource"
},
{
 "levels": [
  {
   "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_0.jpg",
   "width": 6275,
   "class": "ImageResourceLevel",
   "height": 4446
  },
  {
   "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_1.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 2902
  },
  {
   "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_2.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1451
  },
  {
   "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_3.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 725
  },
  {
   "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_4.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 362
  }
 ],
 "id": "ImageResource_93E5035B_BF3E_1F36_41E4_02AC12C6A6B2",
 "class": "ImageResource"
},
{
 "initialPosition": {
  "yaw": -176.69,
  "class": "PanoramaCameraPosition",
  "hfov": 111,
  "pitch": 1.96
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_camera",
 "automaticZoomSpeed": 10
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_A7F7142D_BEB6_B346_41DE_160664B2D89C",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid30602ECA_216D_D958_41B6_FBCFBA4A89F1"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "bodyBorderSize": 0,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "footerBorderColor": "#000000",
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "footerBorderSize": 0,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window25829"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "bodyBorderColor": "#000000",
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "items": [
  {
   "media": "this.panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC",
   "player": "this.viewer_uid3067FECA_216D_D958_41A2_4B83B134CDF4PanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_camera"
  }
 ],
 "id": "playList_3067AECA_216D_D958_41BA_029C5BF484E7",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 172.34,
  "class": "PanoramaCameraPosition",
  "hfov": 84,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30BBAF43_216D_D748_41BA_E344F0EEB5E3",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 3.37,
  "class": "PanoramaCameraPosition",
  "hfov": 80,
  "pitch": 7.75
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669",
   "player": "this.viewer_uid30602ECA_216D_D958_41B6_FBCFBA4A89F1PanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_camera"
  }
 ],
 "id": "playList_30601ECA_216D_D958_41AF_1463AE4C6F22",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "hideDuration": 500,
 "autoplay": true,
 "id": "popup_936400A0_BF3E_7912_41D9_2DED96CB6E81",
 "rotationX": 0,
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "class": "PopupPanoramaOverlay",
 "popupDistance": 100,
 "yaw": 3.12,
 "hfov": 50.21,
 "pitch": 0.69,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_92B5B1ED_BF32_1B12_41AC_845335AD02C7.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_4.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 767
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 90.15,
 "hfov": 39.1,
 "pitch": 0.58
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_ACE1D66D_BF21_B062_41CE_710F156150BA",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_3.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 706
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 109.41,
 "hfov": 7.65,
 "pitch": -7.51
},
{
 "levels": [
  {
   "url": "media/popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875_0_0.jpg",
   "width": 1413,
   "class": "ImageResourceLevel",
   "height": 1092
  },
  {
   "url": "media/popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 791
  },
  {
   "url": "media/popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 395
  }
 ],
 "id": "ImageResource_AAD4CD2C_BF35_EB13_41A5_5014B866640E",
 "class": "ImageResource"
},
{
 "vfov": 180,
 "partial": false,
 "id": "panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "label": "Street View 360",
 "pitch": 0,
 "hfovMin": "400%",
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_t.jpg",
 "class": "Panorama"
},
{
 "initialPosition": {
  "yaw": 179.17,
  "class": "PanoramaCameraPosition",
  "hfov": 94,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3095DF78_216D_D738_41AF_B42199D3AE40",
 "automaticZoomSpeed": 10
},
{
 "levels": [
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_0.jpg",
   "width": 8651,
   "class": "ImageResourceLevel",
   "height": 6487
  },
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_1.jpg",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 6142
  },
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_2.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 3071
  },
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_3.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1535
  },
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_4.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 767
  },
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_5.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 383
  }
 ],
 "id": "ImageResource_9860F25C_BF52_1932_41C2_F37C30930EC7",
 "class": "ImageResource"
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_2A78F978_2165_FB38_41BC_E22EE17FBA59",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "scrollBarVisible": "rollOver",
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "closeButtonPaddingTop": 5,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "class": "Window",
 "bodyPaddingTop": 0,
 "shadowSpread": 1,
 "modal": true,
 "backgroundColor": [],
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "verticalAlign": "middle",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "closeButtonRollOverIconLineWidth": 5,
 "closeButtonPressedIconLineWidth": 5,
 "closeButtonRollOverIconColor": "#666666",
 "bodyPaddingBottom": 0,
 "closeButtonRollOverBorderColor": "#000000",
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "closeButtonRollOverBorderSize": 0,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid306DBEC7_216D_D948_4186_0DC5D7DA937B"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "closeButtonBackgroundOpacity": 0.3,
 "closeButtonPaddingRight": 5,
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "closeButtonPressedBackgroundOpacity": 0.3,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPaddingBottom": 5,
 "closeButtonBorderRadius": 0,
 "closeButtonPressedBorderColor": "#000000",
 "borderRadius": 5,
 "closeButtonPaddingLeft": 5,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "headerBackgroundOpacity": 0,
 "closeButtonBorderSize": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 5,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window416"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#888888",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "closeButtonPressedBorderSize": 0
},
{
 "items": [
  {
   "media": "this.panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418",
   "player": "this.viewer_uid30653ECB_216D_D958_41B5_99D5D205ABE3PanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_camera"
  }
 ],
 "id": "playList_30651ECB_216D_D958_41B9_EAE4A9A31F1C",
 "class": "PlayList"
},
{
 "rollOverBackgroundColor": "#000000",
 "fontFamily": "Arial",
 "selectedFontColor": "#FFFFFF",
 "children": [
  {
   "label": "1",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  },
  {
   "label": "2",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  },
  {
   "label": "3",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  },
  {
   "label": "4",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  },
  {
   "label": "5",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  },
  {
   "label": "6",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  },
  {
   "label": "Street View 36D0",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  },
  {
   "label": "Street View 360",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  },
  {
   "label": "Street View 360",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  },
  {
   "label": "Street VieXCw 360",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  },
  {
   "label": "la ermita",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  },
  {
   "label": "parque fernandez madrid",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  },
  {
   "label": "plaza bolivar",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  },
  {
   "label": "casa niza",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  },
  {
   "label": "bellas artes",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  },
  {
   "label": "teatro",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 17)"
  },
  {
   "label": "Street VieXCw 360",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "label": "Media",
 "id": "Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "fontColor": "#FFFFFF",
 "class": "Menu",
 "rollOverFontColor": "#FFFFFF",
 "opacity": 0.4,
 "rollOverOpacity": 0.8,
 "backgroundColor": "#404040",
 "selectedBackgroundColor": "#202020"
},
{
 "items": [
  {
   "media": "this.video_92B5B1ED_BF32_1B12_41AC_845335AD02C7",
   "start": "this.viewer_uid305EDECE_216D_D958_41B3_6CA04AAC00DFVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_30403EDA_216D_D979_41AA_E5F145180639, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_30403EDA_216D_D979_41AA_E5F145180639, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid305EDECE_216D_D958_41B3_6CA04AAC00DFVideoPlayer)",
   "player": "this.viewer_uid305EDECE_216D_D958_41B3_6CA04AAC00DFVideoPlayer"
  }
 ],
 "id": "PlayList_30403EDA_216D_D979_41AA_E5F145180639",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": -28.03,
  "class": "PanoramaCameraPosition",
  "hfov": 80,
  "pitch": 2.63
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_camera",
 "automaticZoomSpeed": 10
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "hideDuration": 500,
 "autoplay": true,
 "id": "popup_CAE3408C_C558_E9CE_41D2_099A88CECC9A",
 "rotationX": 0,
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "class": "PopupPanoramaOverlay",
 "popupDistance": 100,
 "yaw": 90.13,
 "hfov": 3.24,
 "pitch": -22.86,
 "video": {
  "width": 2986,
  "mp4Url": "media/video_AB72F879_BE95_7D22_41D9_61CE633D38DD.mp4",
  "class": "VideoResource",
  "height": 1680
 }
},
{
 "levels": [
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_0.jpg",
   "width": 10200,
   "class": "ImageResourceLevel",
   "height": 13969
  },
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_1.jpg",
   "width": 5981,
   "class": "ImageResourceLevel",
   "height": 8192
  },
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_2.jpg",
   "width": 2990,
   "class": "ImageResourceLevel",
   "height": 4096
  },
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_3.jpg",
   "width": 1495,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_4.jpg",
   "width": 747,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_5.jpg",
   "width": 373,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ],
 "id": "ImageResource_AAD43D2D_BF35_EB6D_41DF_4066860A658B",
 "class": "ImageResource"
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "partial": false,
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_t.jpg",
 "label": "Street VieXCw 360",
 "id": "panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 130,
 "class": "Panorama",
 "pitch": 0,
 "hfovMin": "150%",
 "hfov": 360
},
{
 "items": [
  {
   "media": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_camera"
  },
  {
   "media": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_camera"
  },
  {
   "media": "this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_camera"
  },
  {
   "media": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_camera"
  },
  {
   "media": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_camera"
  },
  {
   "media": "this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 5, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_camera"
  }
 ],
 "id": "ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_5.jpg",
    "width": 750,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 62.11,
 "hfov": 5.11,
 "pitch": -6.94
},
{
 "initialPosition": {
  "yaw": 75.67,
  "class": "PanoramaCameraPosition",
  "hfov": 106,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30C98F33_216D_D8C8_4191_C0D977D4F172",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -54.78,
  "class": "PanoramaCameraPosition",
  "hfov": 101,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 9.02,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30A53F68_216D_D758_41AC_A6978602F92A",
 "manualRotationSpeed": 612,
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 81.84,
  "class": "PanoramaCameraPosition",
  "hfov": 103,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_33672FA9_216D_D7D8_41B7_BCE9B95C2ED4",
 "automaticZoomSpeed": 10
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_CAF50A20_C559_B8F6_41E6_344069E1C2AB",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid306D4EC7_216D_D948_41B1_D4C5C1947420"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window20926"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "levels": [
  {
   "url": "media/popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D_0_0.jpg",
   "width": 2879,
   "class": "ImageResourceLevel",
   "height": 1679
  },
  {
   "url": "media/popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D_0_1.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1194
  },
  {
   "url": "media/popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D_0_2.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 597
  },
  {
   "url": "media/popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D_0_3.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 298
  }
 ],
 "id": "ImageResource_AAD62D2B_BF35_EB15_41DE_5A00B957C0DA",
 "class": "ImageResource"
},
{
 "initialPosition": {
  "yaw": 87.87,
  "class": "PanoramaCameraPosition",
  "hfov": 105,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_33774F98_216D_D7F8_41A5_087ABAF87F9C",
 "automaticZoomSpeed": 10
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_CA352DA7_C549_BBFA_41E6_161386B7E332",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_CA352DA7_C549_BBFA_41E6_161386B7E332_0_1.jpg",
    "width": 1023,
    "class": "ImageResourceLevel",
    "height": 409
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 61.33,
 "hfov": 12.16,
 "pitch": -27.87
},
{
 "initialPosition": {
  "yaw": 83.98,
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "pitch": 12.22
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_camera",
 "automaticZoomSpeed": 10
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_3.jpg",
    "width": 752,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 69.72,
 "hfov": 3.93,
 "pitch": -7.42
},
{
 "autoplay": true,
 "class": "MediaAudio",
 "id": "audio_A61333B3_BF52_3F75_41C0_083E46F7B44F",
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_A61333B3_BF52_3F75_41C0_083E46F7B44F.ogg",
  "mp3Url": "media/audio_A61333B3_BF52_3F75_41C0_083E46F7B44F.mp3"
 },
 "data": {
  "label": "ElevenLabs_2024-09-04T23_08_25_Charlie_pre_s100_sb75_se0_b_m2"
 }
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_3.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 725
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 88.04,
 "hfov": 39.84,
 "pitch": 0.46
},
{
 "initialPosition": {
  "yaw": 106.32,
  "class": "PanoramaCameraPosition",
  "hfov": 99,
  "pitch": -1.28
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_camera",
 "automaticZoomSpeed": 10
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 791
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 101.54,
 "hfov": 7.55,
 "pitch": -8.7
},
{
 "initialPosition": {
  "yaw": -1.42,
  "class": "PanoramaCameraPosition",
  "hfov": 114,
  "pitch": 4.31
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_camera",
 "automaticZoomSpeed": 10
},
{
 "autoplay": true,
 "class": "MediaAudio",
 "id": "audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A",
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A.ogg",
  "mp3Url": "media/audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A.mp3"
 },
 "data": {
  "label": "ElevenLabs_2024-09-08T03_26_22_Charlie_pre_s100_sb75_se0_b_m2"
 }
},
{
 "vfov": 180,
 "label": "1",
 "id": "panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "adjacentPanoramas": [
  {
   "backwardYaw": -104.33,
   "yaw": 125.22,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583"
  },
  {
   "backwardYaw": -7.66,
   "yaw": 39.89,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE"
  }
 ],
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "hfovMin": "400%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_t.jpg"
  }
 ],
 "thumbnailUrl": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_t.jpg",
 "overlays": [
  "this.overlay_B0D42CA9_BE75_9525_41DF_01C3AA07CDEE",
  "this.overlay_B1FED0EE_BE76_8D3F_41A8_6CA6EB70BB0E",
  "this.overlay_D1E3752E_C548_A8CA_41D7_562CC9728E8B"
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "yaw": 87.93,
  "class": "PanoramaCameraPosition",
  "hfov": 103,
  "pitch": 5.87
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_camera",
 "automaticZoomSpeed": 10
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_A4DA311A_BEB3_F54D_41E0_10D105FB3BE2",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid30666ECB_216D_D958_41B5_D502B52685F7"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window28504"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "vfov": 180,
 "label": "Street View 36D0",
 "id": "panorama_AA2A4656_BEB6_956F_415A_37CC95040116",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "adjacentPanoramas": [
  {
   "backwardYaw": 90.31,
   "yaw": -0.83,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583"
  }
 ],
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "hfovMin": "400%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_t.jpg",
 "overlays": [
  "this.overlay_E7245171_F718_A42F_41E5_9D1DC283662C"
 ],
 "class": "Panorama"
},
{
 "items": [
  {
   "media": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116",
   "player": "this.viewer_uid30684EC5_216D_D948_41B9_F05124ACFA69PanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116_camera"
  }
 ],
 "id": "playList_30692EC4_216D_D948_41A4_635C4FDB2B46",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_9108967E_BF32_19EE_41E4_201CC3FF17B4",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_305D1ECF_216D_D958_41B0_EE86AE9D0484, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_305D1ECF_216D_D958_41B0_EE86AE9D0484, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer"
  }
 ],
 "id": "playList_305D1ECF_216D_D958_41B0_EE86AE9D0484",
 "class": "PlayList"
},
{
 "id": "popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_4.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 734
   },
   {
    "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_5.jpg",
    "width": 750,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "rotationX": 0,
 "hfov": 7.93,
 "pitch": 2.11,
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "yaw": 109.77,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "class": "PopupPanoramaOverlay",
 "popupDistance": 100
},
{
 "thumbnailUrl": "media/video_9108967E_BF32_19EE_41E4_201CC3FF17B4_t.jpg",
 "label": "video_7A9C6568_6E03_BD4C_41BB_CB49EF442FC8",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_9108967E_BF32_19EE_41E4_201CC3FF17B4",
 "class": "Video",
 "height": 720,
 "video": {
  "width": 1280,
  "mp4Url": "media/video_9108967E_BF32_19EE_41E4_201CC3FF17B4.mp4",
  "class": "VideoResource",
  "height": 720
 }
},
{
 "vfov": 180,
 "partial": false,
 "id": "panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "label": "casa niza",
 "pitch": 0,
 "hfovMin": "400%",
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 11,
      "width": 5632,
      "rowCount": 11,
      "tags": "ondemand",
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_t.jpg",
 "class": "Panorama"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_CA122D68_C55B_5B76_41BC_163ECE009C39",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_4.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 768
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 156,
 "hfov": 15.46,
 "pitch": -2.82
},
{
 "initialPosition": {
  "yaw": -98.35,
  "class": "PanoramaCameraPosition",
  "hfov": 99,
  "pitch": 2.73
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_camera",
 "automaticZoomSpeed": 10
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_A3F77F07_BEBD_AD43_41E0_2C31FD642E74",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid305BDECC_216D_D958_413B_3049F0CE3300"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window31291"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_A2042F7F_BEB2_EDC2_41B1_5BDC3E51217C",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid3067FECA_216D_D958_41A2_4B83B134CDF4"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window26716"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "initialPosition": {
  "yaw": 154.72,
  "class": "PanoramaCameraPosition",
  "hfov": 84,
  "pitch": -2.67
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_camera",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/video_92B5B1ED_BF32_1B12_41AC_845335AD02C7_t.jpg",
 "label": "video",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "id": "video_92B5B1ED_BF32_1B12_41AC_845335AD02C7",
 "class": "Video",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_92B5B1ED_BF32_1B12_41AC_845335AD02C7.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "thumbnailUrl": "media/video_AB72F879_BE95_7D22_41D9_61CE633D38DD_t.jpg",
 "label": "video_7F40EE64_6E46_44D3_41D5_7C5E3BFDD79E",
 "scaleMode": "fit_inside",
 "width": 2986,
 "loop": false,
 "id": "video_AB72F879_BE95_7D22_41D9_61CE633D38DD",
 "class": "Video",
 "height": 1680,
 "video": {
  "width": 2986,
  "mp4Url": "media/video_AB72F879_BE95_7D22_41D9_61CE633D38DD.mp4",
  "class": "VideoResource",
  "height": 1680
 }
},
{
 "levels": [
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_0.jpg",
   "width": 8651,
   "class": "ImageResourceLevel",
   "height": 6487
  },
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_1.jpg",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 6142
  },
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_2.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 3071
  },
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_3.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1535
  },
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_4.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 767
  },
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_5.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 383
  }
 ],
 "id": "ImageResource_A9CC5FAA_BEF2_9327_41B7_FE8E120DE5C2",
 "class": "ImageResource"
},
{
 "initialPosition": {
  "yaw": 105,
  "class": "PanoramaCameraPosition",
  "hfov": 106,
  "pitch": -6.82
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -6.84,
  "class": "PanoramaCameraPosition",
  "hfov": 84,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3085AF88_216D_D7D8_41B1_B3BE31EAFA9D",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "3",
 "id": "panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "adjacentPanoramas": [
  {
   "backwardYaw": 88.48,
   "yaw": -89,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583"
  }
 ],
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "hfovMin": "400%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_t.jpg",
 "overlays": [
  "this.overlay_ABB4B996_BEF5_9FEF_41C0_2F1A7275D166",
  "this.popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377",
  "this.overlay_A319A6B7_BEF2_B52D_41D3_27F004D737D3",
  "this.overlay_A5E2BE86_BEFE_B5EF_41D9_F30BDE3E73E5",
  "this.overlay_A7785CB2_BEFE_F526_41D5_693CD3F417C0",
  "this.overlay_A40D28B6_BEFD_7D2F_41E0_3EF222D5DF50",
  "this.overlay_A674DDA4_BEFD_B723_41E6_6E125AE567D8",
  "this.overlay_A7336DD3_BEF2_9765_41E6_9E7C98C69EA8",
  "this.overlay_A90D73E4_BEF3_7323_41E7_57CE3A611FE7",
  "this.overlay_A614A866_BEF3_9D2F_41CC_7D20C75E9AC4",
  "this.overlay_A74F4B8C_BEF2_B3E3_419C_8819A5EBF662",
  "this.overlay_A6EBB5B7_BEF2_B72D_41E0_5F90A6264D7B",
  "this.overlay_A6D7CA14_BEF6_BCE3_41C6_D9A8B8021E25",
  "this.overlay_A79A7AF3_BEF6_9D25_41C4_10E641F9B442",
  "this.overlay_A9470ABB_BEF6_9D25_41E1_BFEC9F22709F",
  "this.overlay_A62A556F_BEF5_973E_41A8_3FA74B909572",
  "this.overlay_A722CBAE_BEF5_F33F_41E2_7CD2EE811F9A",
  "this.overlay_A9056E81_BEF5_95E5_41E0_A94A278C8589",
  "this.overlay_A6D0E2DE_BEF5_8D1F_41E0_F4CC9E3A1D41",
  "this.overlay_A6571966_BEF5_7F2F_41D2_CE07DB193AAA",
  "this.popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC",
  "this.popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465",
  "this.popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A",
  "this.popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2",
  "this.popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D",
  "this.popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875",
  "this.popup_ACE1D66D_BF21_B062_41CE_710F156150BA",
  "this.popup_A904160D_BF21_53BD_41CD_A66E25EE7D42",
  "this.popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A",
  "this.popup_A62E6F27_BF33_E71E_414D_7F4159A130D3",
  "this.overlay_A0A7BB52_BF76_2F36_41D0_41B67BD7E48A"
 ],
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "4",
 "id": "panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "adjacentPanoramas": [
  {
   "backwardYaw": 17.07,
   "yaw": 173.16,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD"
  },
  {
   "backwardYaw": 39.89,
   "yaw": -7.66,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525"
  }
 ],
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "hfovMin": "400%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_t.jpg",
 "overlays": [
  "this.overlay_A7F22179_BF2E_FBF2_41C6_2C6A56310698",
  "this.popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71",
  "this.overlay_A79E3A18_BF2E_6933_4183_23B529B6E83F",
  "this.overlay_A5A2F4DA_BF6E_1937_41E6_2592D8C0C379",
  "this.overlay_A4D4225B_BF6E_1936_41E1_32CC3C337BB3"
 ],
 "class": "Panorama"
},
{
 "items": [
  {
   "media": "this.panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92",
   "player": "this.viewer_uid305BDECC_216D_D958_413B_3049F0CE3300PanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_camera"
  }
 ],
 "id": "playList_30646ECB_216D_D958_41BA_7AC7890EC34A",
 "class": "PlayList"
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_A4DBFBBC_BEB2_9545_41D6_C8D63A5057DF",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid3066DECA_216D_D958_4192_BB1F98FF911F"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window27600"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "autoplay": true,
 "class": "MediaAudio",
 "id": "audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C",
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C.ogg",
  "mp3Url": "media/audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C.mp3"
 },
 "data": {
  "label": "ElevenLabs_2024-09-05T00_33_31_Charlie_pre_s100_sb75_se0_b_m2"
 }
},
{
 "duration": 100,
 "id": "effect_66563DD8_7178_4FDA_41D7_8C4F9A40867B",
 "class": "SlideInEffect",
 "easing": "linear",
 "from": "top"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_3.jpg",
    "width": 666,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 76.93,
 "hfov": 5.08,
 "pitch": -7.66
},
{
 "vfov": 180,
 "partial": false,
 "id": "panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "label": "Street VieXCw 360",
 "pitch": 0,
 "hfovMin": "400%",
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_t.jpg",
 "class": "Panorama"
},
{
 "vfov": 180,
 "label": "5",
 "id": "panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "adjacentPanoramas": [
  {
   "backwardYaw": 173.16,
   "yaw": 17.07,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE"
  },
  {
   "backwardYaw": -92.13,
   "yaw": -98.16,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC"
  }
 ],
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "hfovMin": "400%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "width": 3072,
      "rowCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_t.jpg",
 "overlays": [
  "this.overlay_A0EF30B3_BF72_1976_41BC_B16DDEE112D3",
  "this.overlay_A1D596B1_BF75_F975_41E5_161D6B995BAA",
  "this.overlay_9ADC8EA8_BF72_2913_41E0_6B8608E63068",
  "this.popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C",
  "this.overlay_9DE28A0A_BF6E_2916_41CD_9171EAA1F0AF",
  "this.popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF",
  "this.overlay_9C2C01F1_BF6E_3AF2_41C8_C58DC783679D",
  "this.popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2",
  "this.overlay_90C45A72_BFF2_69F6_41C5_5E2F51F26185"
 ],
 "class": "Panorama"
},
{
 "initialPosition": {
  "yaw": 91,
  "class": "PanoramaCameraPosition",
  "hfov": 91,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30B47F58_216D_D778_41B5_E932547CAB83",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -162.93,
  "class": "PanoramaCameraPosition",
  "hfov": 103,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30EF9F14_216D_D8C9_41BB_358ABCEF8839",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.video_92B5B1ED_BF32_1B12_41AC_845335AD02C7",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_305DCECF_216D_D958_41AA_D551EE36D3D6, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_305DCECF_216D_D958_41AA_D551EE36D3D6, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer"
  }
 ],
 "id": "playList_305DCECF_216D_D958_41AA_D551EE36D3D6",
 "class": "PlayList"
},
{
 "class": "ImageResource",
 "id": "ImageResource_AADB1D2E_BF35_EB6F_41E1_B0BB04B8F064"
},
{
 "levels": [
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_0.jpg",
   "width": 8651,
   "class": "ImageResourceLevel",
   "height": 6487
  },
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_1.jpg",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 6142
  },
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_2.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 3071
  },
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_3.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1535
  },
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_4.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 767
  },
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_5.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 383
  }
 ],
 "id": "ImageResource_999FE25B_BF52_1936_41DC_F9120685B889",
 "class": "ImageResource"
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_CA9B483E_C547_78CA_41D2_B4025CE0C701",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid30684EC5_216D_D948_41B9_F05124ACFA69"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window14104"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "bodyBackgroundColorDirection": "vertical",
 "bodyPaddingRight": 0,
 "id": "window_D5146985_C547_5BBE_41C2_0BDA6BC8F4D7",
 "scrollBarColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 400,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "headerVerticalAlign": "middle",
 "bodyBackgroundOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 3,
 "minHeight": 20,
 "class": "Window",
 "titlePaddingLeft": 5,
 "shadowSpread": 1,
 "modal": true,
 "height": 600,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "titleFontSize": "1.29vmin",
 "backgroundColor": [],
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "backgroundOpacity": 1,
 "minWidth": 20,
 "headerBackgroundColorDirection": "vertical",
 "titleFontWeight": "normal",
 "bodyPaddingTop": 0,
 "title": "",
 "bodyPaddingBottom": 0,
 "headerBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "verticalAlign": "middle",
 "veilColorDirection": "horizontal",
 "closeButtonPressedIconLineWidth": 3,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "propagateClick": false,
 "titlePaddingTop": 5,
 "footerBackgroundOpacity": 0,
 "shadow": true,
 "overflow": "scroll",
 "closeButtonPressedBackgroundColor": [],
 "layout": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "footerHeight": 5,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "horizontalAlign": "center",
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uid306E1EC6_216D_D948_41B1_67D2EB9DF4E0"
 ],
 "shadowColor": "#000000",
 "closeButtonIconHeight": 20,
 "titleFontStyle": "normal",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "titleFontFamily": "Arial",
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingBottom": 5,
 "headerBorderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "borderRadius": 5,
 "titleTextDecoration": "none",
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "gap": 10,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window19306"
 },
 "paddingTop": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20
},
{
 "vfov": 180,
 "partial": false,
 "id": "panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "label": "la ermita",
 "pitch": 0,
 "hfovMin": "400%",
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_t.jpg",
 "class": "Panorama"
},
{
 "levels": [
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_0.jpg",
   "width": 16833,
   "class": "ImageResourceLevel",
   "height": 11744
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_1.jpg",
   "width": 16384,
   "class": "ImageResourceLevel",
   "height": 11430
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_2.jpg",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 5715
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_3.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 2857
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_4.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1428
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_5.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 714
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_6.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 357
  }
 ],
 "id": "ImageResource_9BD1576F_BF72_27ED_41E6_C94D013294AF",
 "class": "ImageResource"
},
{
 "initialPosition": {
  "yaw": -89.69,
  "class": "PanoramaCameraPosition",
  "hfov": 106,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_33516FBE_216D_D738_41BB_E501D6C1AFF2",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "partial": false,
 "id": "panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC",
 "cardboardMenu": "this.Menu_30470EDA_216D_D979_41B9_CE863C70ABDC",
 "hfovMax": 150,
 "label": "parque fernandez madrid",
 "pitch": 0,
 "hfovMin": "400%",
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_t.jpg",
 "class": "Panorama"
},
{
 "initialPosition": {
  "yaw": 0.86,
  "class": "PanoramaCameraPosition",
  "hfov": 94,
  "pitch": 8.44
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_AA2A4656_BEB6_956F_415A_37CC95040116_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -2.42,
  "class": "PanoramaCameraPosition",
  "hfov": 92,
  "pitch": 9.24
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9",
   "player": "this.viewer_uid306C3EC7_216D_D957_41AF_1EC54B772D9BPanoPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_camera"
  }
 ],
 "id": "playList_306CFEC7_216D_D948_41A3_B44A73FF59B2",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC",
   "start": "this.viewer_uid306F2EC6_216D_D948_41AC_76221BB287DFVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_3043AED9_216D_D97B_41B0_AF8AB8535A49, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_3043AED9_216D_D97B_41B0_AF8AB8535A49, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid306F2EC6_216D_D948_41AC_76221BB287DFVideoPlayer)",
   "player": "this.viewer_uid306F2EC6_216D_D948_41AC_76221BB287DFVideoPlayer"
  }
 ],
 "id": "PlayList_3043AED9_216D_D97B_41B0_AF8AB8535A49",
 "class": "PlayList"
},
{
 "levels": [
  {
   "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_0.jpg",
   "width": 4267,
   "class": "ImageResourceLevel",
   "height": 2944
  },
  {
   "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_1.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 2826
  },
  {
   "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_2.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1413
  },
  {
   "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_3.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 706
  },
  {
   "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_4.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 353
  }
 ],
 "id": "ImageResource_AAD52D2C_BF35_EB13_41C8_6FB4CC88898E",
 "class": "ImageResource"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupMaxHeight": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hideDuration": 500,
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71",
 "class": "PopupPanoramaOverlay",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_4.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 767
   }
  ]
 },
 "popupDistance": 100,
 "yaw": 89.18,
 "hfov": 51.99,
 "pitch": 0.61
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "MainViewer",
 "left": 0,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "top": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "borderSize": 0,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "itemMaxWidth": 1000,
 "itemThumbnailShadowColor": "#000000",
 "id": "ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541",
 "scrollBarColor": "#FFFFFF",
 "itemLabelHorizontalAlign": "center",
 "itemLabelFontStyle": "normal",
 "right": "44.39%",
 "scrollBarVisible": "rollOver",
 "itemMode": "normal",
 "itemPaddingRight": 3,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "itemThumbnailShadowOpacity": 0.27,
 "itemThumbnailOpacity": 1,
 "minHeight": 10,
 "itemOpacity": 1,
 "class": "ThumbnailGrid",
 "itemLabelFontFamily": "Arial",
 "itemBorderRadius": 0,
 "backgroundColor": [
  "#000000"
 ],
 "itemThumbnailShadowHorizontalLength": 3,
 "itemMaxHeight": 1000,
 "paddingBottom": 0,
 "height": "17.924%",
 "itemPaddingLeft": 3,
 "backgroundOpacity": 0.33,
 "minWidth": 10,
 "verticalAlign": "top",
 "itemBackgroundOpacity": 0,
 "selectedItemLabelFontColor": "#FFCC00",
 "itemLabelPosition": "top",
 "itemHorizontalAlign": "center",
 "itemThumbnailBorderRadius": 19,
 "width": "11.218%",
 "itemThumbnailShadowSpread": 1,
 "propagateClick": false,
 "itemPaddingTop": 3,
 "itemThumbnailShadowVerticalLength": 3,
 "itemBackgroundColor": [],
 "shadow": false,
 "itemBackgroundColorRatios": [],
 "itemWidth": 60,
 "horizontalAlign": "center",
 "rollOverItemLabelFontWeight": "bold",
 "rollOverItemBackgroundOpacity": 0,
 "backgroundColorDirection": "vertical",
 "itemMinHeight": 50,
 "paddingRight": 0,
 "itemLabelTextDecoration": "none",
 "itemLabelFontWeight": "normal",
 "selectedItemLabelFontWeight": "bold",
 "playList": "this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist",
 "borderSize": 0,
 "itemThumbnailShadowBlurRadius": 8,
 "bottom": "5.58%",
 "scrollBarMargin": 2,
 "itemVerticalAlign": "middle",
 "itemLabelFontSize": 14,
 "itemThumbnailScaleMode": "fit_outside",
 "itemThumbnailHeight": 33,
 "itemLabelFontColor": "#FFFFFF",
 "borderRadius": 5,
 "itemMinWidth": 50,
 "itemHeight": 80,
 "itemLabelGap": 1,
 "gap": 0,
 "itemThumbnailShadow": true,
 "itemBackgroundColorDirection": "vertical",
 "data": {
  "name": "PANORAMAS"
 },
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "itemPaddingBottom": 3
},
{
 "horizontalAlign": "center",
 "maxHeight": 1094,
 "maxWidth": 1096,
 "id": "Image_662ED9D9_7178_37D1_41BC_B29C3F34DB16",
 "right": "48.3%",
 "width": "2.86%",
 "paddingRight": 0,
 "url": "skin/Image_662ED9D9_7178_37D1_41BC_B29C3F34DB16.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "Image",
 "borderSize": 0,
 "bottom": "0.51%",
 "height": "4.204%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "click": "if(!this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541.get('visible')){ this.setComponentVisibility(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541, true, 0, this.effect_66563DD8_7178_4FDA_41D7_8C4F9A40867B, 'showEffect', false) } else { this.setComponentVisibility(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541, false, 0, this.effect_66561DD8_7178_4FDA_41B5_A74B9759BE30, 'hideEffect', false) }",
 "propagateClick": false,
 "verticalAlign": "middle",
 "data": {
  "name": "Image24731"
 },
 "paddingTop": 0,
 "shadow": false,
 "scaleMode": "fit_inside"
},
{
 "horizontalAlign": "left",
 "id": "Container_6792CE20_7179_CC6A_41D0_E818C4D261B5",
 "scrollBarColor": "#000000",
 "width": 104.1,
 "right": "0.06%",
 "children": [
  "this.Container_679D9E20_7179_CC6A_41D2_5F5D75BA8E2D",
  "this.Container_679D4E20_7179_CC6A_41CF_BEB9A80A562A"
 ],
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "Container",
 "borderSize": 0,
 "contentOpaque": false,
 "bottom": "4.16%",
 "height": 416.29,
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "layout": "absolute",
 "propagateClick": true,
 "verticalAlign": "top",
 "gap": 10,
 "data": {
  "name": "--SETTINGS"
 },
 "paddingTop": 0,
 "shadow": false,
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "horizontalAlign": "left",
 "id": "Container_C6C04894_C81E_A06E_41E2_CFA3F601EC35",
 "left": "1.45%",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Image_C6C7AAB5_C81F_A1AF_41C0_5D9062D984B6"
 ],
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "width": "6.09%",
 "class": "Container",
 "top": "0%",
 "contentOpaque": false,
 "borderSize": 0,
 "paddingBottom": 0,
 "height": "11.036%",
 "scrollBarMargin": 2,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "data": {
  "name": "Container2784"
 },
 "propagateClick": false,
 "shadow": false,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "paddingTop": 0,
 "verticalAlign": "top"
},
{
 "id": "veilPopupPanorama",
 "left": 0,
 "backgroundColorDirection": "vertical",
 "right": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "class": "UIComponent",
 "top": 0,
 "bottom": 0,
 "backgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "borderSize": 0,
 "backgroundOpacity": 0.55,
 "minWidth": 0,
 "borderRadius": 0,
 "propagateClick": false,
 "data": {
  "name": "UIComponent5702"
 },
 "paddingTop": 0,
 "shadow": false,
 "visible": false,
 "showEffect": {
  "duration": 350,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [
  0
 ]
},
{
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "backgroundColorDirection": "vertical",
 "right": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "class": "ZoomImage",
 "top": 0,
 "bottom": 0,
 "backgroundColor": [],
 "paddingBottom": 0,
 "borderSize": 0,
 "backgroundOpacity": 1,
 "minWidth": 0,
 "borderRadius": 0,
 "propagateClick": false,
 "data": {
  "name": "ZoomImage5703"
 },
 "paddingTop": 0,
 "shadow": false,
 "visible": false,
 "scaleMode": "custom",
 "backgroundColorRatios": []
},
{
 "textDecoration": "none",
 "horizontalAlign": "center",
 "rollOverIconColor": "#666666",
 "iconWidth": 20,
 "id": "closeButtonPopupPanorama",
 "backgroundColorDirection": "vertical",
 "fontFamily": "Arial",
 "right": 10,
 "fontColor": "#FFFFFF",
 "paddingRight": 5,
 "paddingLeft": 5,
 "iconHeight": 20,
 "minHeight": 0,
 "class": "CloseButton",
 "top": 10,
 "borderColor": "#000000",
 "shadowSpread": 1,
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "iconColor": "#000000",
 "paddingBottom": 5,
 "mode": "push",
 "shadowColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0.3,
 "minWidth": 0,
 "fontSize": "1.29vmin",
 "iconBeforeLabel": true,
 "borderRadius": 0,
 "label": "",
 "fontStyle": "normal",
 "layout": "horizontal",
 "pressedIconColor": "#888888",
 "propagateClick": false,
 "verticalAlign": "middle",
 "gap": 5,
 "data": {
  "name": "CloseButton5704"
 },
 "paddingTop": 5,
 "shadow": false,
 "visible": false,
 "showEffect": {
  "duration": 350,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "cursor": "hand",
 "fontWeight": "normal",
 "iconLineWidth": 5
},
{
 "horizontalAlign": "center",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_679D1E20_7179_CC6A_41CF_662941DB817D",
 "transparencyActive": true,
 "width": 40,
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_679D1E20_7179_CC6A_41CF_662941DB817D_pressed_rollover.png",
 "iconURL": "skin/IconButton_679D1E20_7179_CC6A_41CF_662941DB817D.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "IconButton",
 "borderSize": 0,
 "height": 58,
 "paddingBottom": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_679D1E20_7179_CC6A_41CF_662941DB817D_pressed.png",
 "borderRadius": 0,
 "propagateClick": true,
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0",
 "transparencyActive": true,
 "width": 40,
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0_pressed_rollover.png",
 "iconURL": "skin/IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "IconButton",
 "borderSize": 0,
 "height": 58,
 "paddingBottom": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0_pressed.png",
 "borderRadius": 0,
 "propagateClick": true,
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton MUTE"
 },
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid30641ECB_216D_D958_4185_EA1444F1E3FA",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5699"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid306E1EC6_216D_D948_41B1_67D2EB9DF4E0",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid306E1EC6_216D_D948_41B1_67D2EB9DF4E0PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_0_0.png",
      "width": 287,
      "class": "ImageResourceLevel",
      "height": 112
     }
    ]
   },
   "pitch": -27.87,
   "yaw": 61.33,
   "hfov": 12.58
  }
 ],
 "id": "overlay_CAC67DCD_C549_BB4E_41C5_3CF13C58EEDB",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_CA352DA7_C549_BBFA_41E6_161386B7E332, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_CA352DA7_C549_BBFA_41D5_C91348F4C13C, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_0_1_0_map.gif",
      "width": 143,
      "class": "ImageResourceLevel",
      "height": 56
     }
    ]
   },
   "yaw": 61.33,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.58,
   "pitch": -27.87
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E5968F7C_F719_DC15_41A9_2989C0462A71",
   "hfov": 1.91,
   "pitch": -29.54,
   "yaw": 87.2,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CABE589A_C547_79CA_41E8_391573AB0C7A",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_CA9B483E_C547_78CA_41D2_B4025CE0C701, this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116, this.playList_30692EC4_216D_D948_41A4_635C4FDB2B46, '90%', '90%', false, false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Torre del reloj"
  }
 ],
 "data": {
  "label": "Circle 360 2"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 87.2,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 1.91,
   "pitch": -29.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D46EF14F_C559_6B4A_41D5_C326E5BD1BB5",
   "hfov": 3.07,
   "pitch": -29.27,
   "yaw": 93.03,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CAE19CF2_C547_D955_41D9_9112F9CEC59E",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_CAEFACD1_C547_D957_41D6_AE6C75408208, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, true) } else { this.showPopupMedia(this.window_2A798978_2165_FB38_41BB_B77B6A572F71, this.video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC, this.PlayList_3043AED9_216D_D97B_41B0_AF8AB8535A49, '95%', '95%', true, true) }"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 93.03,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.07,
   "pitch": -29.27
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D46E414F_C559_6B4A_41D6_1A58FC730F5B",
   "hfov": 1.98,
   "pitch": -25.81,
   "yaw": 90.26,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D5C829C0_C547_5BB6_41E1_0C9B58377FB2",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_D5146985_C547_5BBE_41C2_0BDA6BC8F4D7, this.panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4, this.playList_306ECEC6_216D_D948_41BE_4E502B122B66, '90%', '90%', false, false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Camellon de los martirez"
  }
 ],
 "data": {
  "label": "Circle 360 2"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 90.26,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 1.98,
   "pitch": -25.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D46F8150_C559_6B56_41E4_0F480C3C4F98",
   "hfov": 3.24,
   "pitch": -22.86,
   "yaw": 90.13,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CA9510AC_C558_E9CE_41C3_A41D5EF48930",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_CAE3408C_C558_E9CE_41D2_099A88CECC9A, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, true) } else { this.showPopupMedia(this.window_2A78F978_2165_FB38_41BC_E22EE17FBA59, this.video_AB72F879_BE95_7D22_41D9_61CE633D38DD, this.PlayList_30437ED9_216D_D97B_41B3_37D63C59A1CF, '95%', '95%', true, true) }"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 90.13,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.24,
   "pitch": -22.86
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D46CC150_C559_6B56_41C0_2B5D50FC0C54",
   "hfov": 1.98,
   "pitch": -25.82,
   "yaw": 85.76,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CA933A5B_C559_B94B_41DC_B587DA0D153D",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_CAF50A20_C559_B8F6_41E6_344069E1C2AB, this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C, this.playList_306D3EC7_216D_D948_41C0_5CE43D77E74C, '90%', '90%', false, false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Parque centenario"
  }
 ],
 "data": {
  "label": "Circle 360 2"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 85.76,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 1.98,
   "pitch": -25.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D46FB150_C559_6B56_41E0_6BA58B9F2770",
   "hfov": 3.26,
   "pitch": -21.83,
   "yaw": 85.09,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CA0B160C_C558_A8CE_41D1_FE8D55B30963",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.openLink('https://heyzine.com/flip-book/34871c23aa.html', '_blank')"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 85.09,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.26,
   "pitch": -21.83
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D46F5151_C559_6B56_41E4_1414340655C1",
   "hfov": 2.05,
   "pitch": -21.01,
   "yaw": 80.18,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CA8B0AD6_C558_B95D_41E4_58F264E4C75B",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_CAEAFA9A_C558_B9CA_41D9_0CD75738D73C, this.panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9, this.playList_306CFEC7_216D_D948_41A3_B44A73FF59B2, '90%', '90%', false, false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "obelisco "
  }
 ],
 "data": {
  "label": "Circle 360 2"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 80.18,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 2.05,
   "pitch": -21.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D46C9151_C559_6B56_41E5_1AE858BE7819",
   "hfov": 13.3,
   "pitch": -7.1,
   "yaw": 88.48,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CA589D5A_C55B_BB4A_41E3_4F4E800E94EA",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4, this.camera_30B47F58_216D_D778_41B5_E932547CAB83); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_8_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 88.48,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.3,
   "pitch": -7.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_9_0.png",
      "width": 72,
      "class": "ImageResourceLevel",
      "height": 72
     }
    ]
   },
   "pitch": -12.07,
   "yaw": -173.96,
   "hfov": 3.11
  }
 ],
 "id": "overlay_CAFD7E23_C55B_58FA_41D3_0CC50F82DA5A",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "if(this.getGlobalAudio(this.audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A).get('state') == 'playing') { this.pauseGlobalAudio(this.audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A); } else { var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A); }"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -173.96,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.11,
   "pitch": -12.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_10_0.png",
      "width": 563,
      "class": "ImageResourceLevel",
      "height": 716
     }
    ]
   },
   "pitch": 0.56,
   "yaw": 175.17,
   "hfov": 24.4
  }
 ],
 "id": "overlay_CA7DF477_C559_695B_41DD_EC1D84E678D4",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_CA43744F_C559_694A_41E3_6A94DB282096, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_CA43544F_C559_694A_41B9_3C1104FC2891, null, null, 10300, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Retrato luis felipe jaspe franco"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_10_1_0_map.gif",
      "width": 156,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ]
   },
   "yaw": 175.17,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 24.4,
   "pitch": 0.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_11_0.png",
      "width": 367,
      "class": "ImageResourceLevel",
      "height": 496
     }
    ]
   },
   "pitch": -2.82,
   "yaw": 156,
   "hfov": 16.04
  }
 ],
 "id": "overlay_CA35DD8A_C55B_5BCA_41E7_0DCC2394A201",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_CA122D68_C55B_5B76_41BC_163ECE009C39, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_CA1DDD68_C55B_5B76_41E1_7549F89DFD79, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_11_1_0_map.gif",
      "width": 147,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ]
   },
   "yaw": 156,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.04,
   "pitch": -2.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_DF95A6A2_C548_A9F5_41BC_5ADA030DEDB1",
   "hfov": 15.75,
   "pitch": -27.07,
   "yaw": -104.33,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D140E706_C579_68BA_41E3_CE7135259DF3",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525, this.camera_30A53F68_216D_D758_41AC_A6978602F92A); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_12_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -104.33,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.75,
   "pitch": -27.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E58C4F7F_F719_DC13_41D0_65082F32FDD1",
   "hfov": 2.32,
   "pitch": -30.7,
   "yaw": 90.31,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F8040099_F718_A41F_41D3_6D244066365E",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116, this.camera_3095DF78_216D_D738_41AF_B42199D3AE40); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_13_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 90.31,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 2.32,
   "pitch": -30.7
  }
 ]
},
{
 "horizontalAlign": "center",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "transparencyActive": true,
 "width": 40,
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_679D2E20_7179_CC6A_41B7_F4887B252114_pressed_rollover.png",
 "iconURL": "skin/IconButton_679D2E20_7179_CC6A_41B7_F4887B252114.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "IconButton",
 "borderSize": 0,
 "height": 58,
 "paddingBottom": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_679D2E20_7179_CC6A_41B7_F4887B252114_pressed.png",
 "borderRadius": 0,
 "propagateClick": true,
 "verticalAlign": "middle",
 "paddingTop": 0,
 "shadow": false,
 "data": {
  "name": "IconButton GYRO"
 },
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "transparencyActive": true,
 "width": 40,
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9_pressed_rollover.png",
 "iconURL": "skin/IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "IconButton",
 "borderSize": 0,
 "height": 58,
 "paddingBottom": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9_pressed.png",
 "borderRadius": 0,
 "propagateClick": true,
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton HS "
 },
 "paddingTop": 0,
 "shadow": false,
 "visible": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "transparencyActive": true,
 "width": 40,
 "paddingRight": 0,
 "iconURL": "skin/IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "IconButton",
 "borderSize": 0,
 "height": 58,
 "paddingBottom": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66_rollover.png",
 "propagateClick": true,
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton VR"
 },
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid30666ECB_216D_D958_41B5_D502B52685F7",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid30666ECB_216D_D958_41B5_D502B52685F7PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid30641ECB_216D_D958_4185_EA1444F1E3FA",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid30641ECB_216D_D958_4185_EA1444F1E3FAPanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9CDB6421_BF75_F915_415C_65EFB5DE58CC",
   "hfov": 16.45,
   "pitch": -21.5,
   "yaw": -92.13,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A18AC4B2_BF76_1976_41C1_3449A2C14288",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD, this.camera_33672FA9_216D_D7D8_41B7_BCE9B95C2ED4); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_0_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -92.13,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.45,
   "pitch": -21.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_1_0.png",
      "width": 959,
      "class": "ImageResourceLevel",
      "height": 749
     }
    ]
   },
   "pitch": 0.46,
   "yaw": 88.04,
   "hfov": 40.4
  }
 ],
 "id": "overlay_99A56090_BF32_3932_4181_B8C673A66BE9",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_93E5035B_BF3E_1F36_41E4_02AC12C6A6B2, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_1_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 156
     }
    ]
   },
   "yaw": 88.04,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 40.4,
   "pitch": 0.46
  }
 ]
},
{
 "distance": 50,
 "enabledInCardboard": true,
 "autoplay": true,
 "id": "overlay_91E59851_BF2D_E932_4185_722D58DF4B27",
 "loop": true,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/overlay_91E59851_BF2D_E932_4185_722D58DF4B27_t.jpg",
    "width": 1280,
    "class": "ImageResourceLevel",
    "height": 720
   }
  ]
 },
 "pitch": 0.76,
 "useHandCursor": true,
 "hfov": 50.18,
 "rotationY": -1,
 "vfov": 38.57,
 "yaw": 2.88,
 "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_936400A0_BF3E_7912_41D9_2DED96CB6E81, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, true) } else { this.showPopupMedia(this.window_2B59F6D8_2165_E978_41B3_4E39748CDF4A, this.video_92B5B1ED_BF32_1B12_41AC_845335AD02C7, this.PlayList_30403EDA_216D_D979_41AA_E5F145180639, '95%', '95%', true, true) }",
 "videoVisibleOnStop": false,
 "class": "VideoPanoramaOverlay",
 "rotationX": -0.62,
 "roll": 0.19,
 "blending": 0,
 "data": {
  "label": "Video"
 },
 "video": {
  "width": 1280,
  "mp4Url": "media/video_9108967E_BF32_19EE_41E4_201CC3FF17B4.mp4",
  "class": "VideoResource",
  "height": 720
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_2_0.png",
      "width": 72,
      "class": "ImageResourceLevel",
      "height": 61
     }
    ]
   },
   "pitch": -11.93,
   "yaw": 104.77,
   "hfov": 3.11
  }
 ],
 "id": "overlay_DDC6386A_CD05_0C99_41DF_B08A4474BEE0",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "if(this.getGlobalAudio(this.audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A).get('state') == 'playing') { this.pauseGlobalAudio(this.audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A); } else { var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A); }"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_2_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 104.77,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.11,
   "pitch": -11.93
  }
 ]
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid305EDECE_216D_D958_41B3_6CA04AAC00DF",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5701"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid30653ECB_216D_D958_41B5_99D5D205ABE3",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5698"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid306D4EC7_216D_D948_41B1_D4C5C1947420",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid306D4EC7_216D_D948_41B1_D4C5C1947420PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid306DBEC7_216D_D948_4186_0DC5D7DA937B",
 "id": "viewer_uid306DBEC7_216D_D948_4186_0DC5D7DA937BVideoPlayer",
 "class": "VideoPlayer"
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid306C3EC7_216D_D957_41AF_1EC54B772D9B",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5692"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid30609EC9_216D_D958_41AC_7F44C6D88FD2",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5693"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid30609EC9_216D_D958_41AC_7F44C6D88FD2",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid30609EC9_216D_D958_41AC_7F44C6D88FD2PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid3066DECA_216D_D958_4192_BB1F98FF911F",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid3066DECA_216D_D958_4192_BB1F98FF911FPanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid306F2EC6_216D_D948_41AC_76221BB287DF",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5688"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid30602ECA_216D_D958_41B6_FBCFBA4A89F1",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5694"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid3067FECA_216D_D958_41A2_4B83B134CDF4",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid3067FECA_216D_D958_41A2_4B83B134CDF4PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid30602ECA_216D_D958_41B6_FBCFBA4A89F1",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid30602ECA_216D_D958_41B6_FBCFBA4A89F1PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid306DBEC7_216D_D948_4186_0DC5D7DA937B",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5690"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid30653ECB_216D_D958_41B5_99D5D205ABE3",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid30653ECB_216D_D958_41B5_99D5D205ABE3PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid305EDECE_216D_D958_41B3_6CA04AAC00DF",
 "id": "viewer_uid305EDECE_216D_D958_41B3_6CA04AAC00DFVideoPlayer",
 "class": "VideoPlayer"
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid306D4EC7_216D_D948_41B1_D4C5C1947420",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5691"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AEAFE12C_BE75_8F23_41DE_C19E21A79B25",
   "hfov": 12.55,
   "pitch": -20.61,
   "yaw": 125.22,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B0D42CA9_BE75_9525_41DF_01C3AA07CDEE",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583, this.camera_30C98F33_216D_D8C8_4191_C0D977D4F172); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_1_HS_0_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 125.22,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.55,
   "pitch": -20.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AEAF712D_BE75_8F3D_41E1_F7DB60B1522D",
   "hfov": 12.7,
   "pitch": -18.61,
   "yaw": 39.89,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B1FED0EE_BE76_8D3F_41A8_6CA6EB70BB0E",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE, this.camera_30BBAF43_216D_D748_41BA_E344F0EEB5E3); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_1_HS_1_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 39.89,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.7,
   "pitch": -18.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": false,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0_HS_2_0.png",
      "width": 336,
      "class": "ImageResourceLevel",
      "height": 50
     }
    ]
   },
   "pitch": -8.99,
   "yaw": 128.77,
   "hfov": 14.72
  }
 ],
 "id": "overlay_D1E3752E_C548_A8CA_41D7_562CC9728E8B",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0_HS_2_1_0_map.gif",
      "width": 168,
      "class": "ImageResourceLevel",
      "height": 25
     }
    ]
   },
   "yaw": 128.77,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.72,
   "pitch": -8.99
  }
 ]
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid30666ECB_216D_D958_41B5_D502B52685F7",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5697"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E580DF8F_F719_DCF3_41E1_8F9A71175E15",
   "hfov": 8.09,
   "pitch": 11.89,
   "yaw": -0.83,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E7245171_F718_A42F_41E5_9D1DC283662C",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583, this.camera_33516FBE_216D_D738_41BB_E501D6C1AFF2); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -0.83,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.09,
   "pitch": 11.89
  }
 ]
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid30684EC5_216D_D948_41B9_F05124ACFA69",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid30684EC5_216D_D948_41B9_F05124ACFA69PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid305BDECC_216D_D958_413B_3049F0CE3300",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5700"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid3067FECA_216D_D958_41A2_4B83B134CDF4",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5695"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_0_0.png",
      "width": 1748,
      "class": "ImageResourceLevel",
      "height": 1286
     }
    ]
   },
   "pitch": 2.54,
   "yaw": 89.52,
   "hfov": 67.67
  }
 ],
 "id": "overlay_ABB4B996_BEF5_9FEF_41C0_2F1A7275D166",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':30,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':30,'rollOverIconHeight':30,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':30,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':30,'borderSize':0,'rollOverIconWidth':30,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_A9CC5FAA_BEF2_9327_41B7_FE8E120DE5C2, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_0_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 147
     }
    ]
   },
   "yaw": 89.52,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 67.67,
   "pitch": 2.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_1_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 170
     }
    ]
   },
   "pitch": -6.94,
   "yaw": 62.11,
   "hfov": 5.58
  }
 ],
 "id": "overlay_A319A6B7_BEF2_B52D_41D3_27F004D737D3",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_A94824E1_BEE1_B065_41CC_505D04DA2E35, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_1_1_0_map.gif",
      "width": 63,
      "class": "ImageResourceLevel",
      "height": 85
     }
    ]
   },
   "yaw": 62.11,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.58,
   "pitch": -6.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_2_0.png",
      "width": 167,
      "class": "ImageResourceLevel",
      "height": 132
     }
    ]
   },
   "pitch": -7.42,
   "yaw": 69.72,
   "hfov": 7.35
  }
 ],
 "id": "overlay_A5E2BE86_BEFE_B5EF_41D9_F30BDE3E73E5",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_AAD1BD2A_BF35_EB16_41E0_62D0B58DD2A8, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_2_1_0_map.gif",
      "width": 83,
      "class": "ImageResourceLevel",
      "height": 66
     }
    ]
   },
   "yaw": 69.72,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.35,
   "pitch": -7.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_3_0.png",
      "width": 142,
      "class": "ImageResourceLevel",
      "height": 190
     }
    ]
   },
   "pitch": -7.66,
   "yaw": 76.93,
   "hfov": 6.28
  }
 ],
 "id": "overlay_A7785CB2_BEFE_F526_41D5_693CD3F417C0",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_AAD06D2A_BF35_EB17_41E2_E456BD624EBA, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_3_1_0_map.gif",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   },
   "yaw": 76.93,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.28,
   "pitch": -7.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_4_0.png",
      "width": 199,
      "class": "ImageResourceLevel",
      "height": 173
     }
    ]
   },
   "pitch": -8.04,
   "yaw": 84.88,
   "hfov": 8.77
  }
 ],
 "id": "overlay_A40D28B6_BEFD_7D2F_41E0_3EF222D5DF50",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_AAD75D2B_BF35_EB15_4196_1BE8E0A63146, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_4_1_0_map.gif",
      "width": 99,
      "class": "ImageResourceLevel",
      "height": 86
     }
    ]
   },
   "yaw": 84.88,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.77,
   "pitch": -8.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_5_0.png",
      "width": 215,
      "class": "ImageResourceLevel",
      "height": 154
     }
    ]
   },
   "pitch": -9.26,
   "yaw": 93.3,
   "hfov": 9.43
  }
 ],
 "id": "overlay_A674DDA4_BEFD_B723_41E6_6E125AE567D8",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_AAD62D2B_BF35_EB15_41DE_5A00B957C0DA, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_5_1_0_map.gif",
      "width": 107,
      "class": "ImageResourceLevel",
      "height": 77
     }
    ]
   },
   "yaw": 93.3,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.43,
   "pitch": -9.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_6_0.png",
      "width": 182,
      "class": "ImageResourceLevel",
      "height": 149
     }
    ]
   },
   "pitch": -8.7,
   "yaw": 101.54,
   "hfov": 8.03
  }
 ],
 "id": "overlay_A7336DD3_BEF2_9765_41E6_9E7C98C69EA8",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_AAD4CD2C_BF35_EB13_41A5_5014B866640E, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_6_1_0_map.gif",
      "width": 91,
      "class": "ImageResourceLevel",
      "height": 74
     }
    ]
   },
   "yaw": 101.54,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.03,
   "pitch": -8.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_7_0.png",
      "width": 184,
      "class": "ImageResourceLevel",
      "height": 138
     }
    ]
   },
   "pitch": -7.51,
   "yaw": 109.41,
   "hfov": 8.11
  }
 ],
 "id": "overlay_A90D73E4_BEF3_7323_41E7_57CE3A611FE7",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_ACE1D66D_BF21_B062_41CE_710F156150BA, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_AAD52D2C_BF35_EB13_41C8_6FB4CC88898E, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_7_1_0_map.gif",
      "width": 92,
      "class": "ImageResourceLevel",
      "height": 69
     }
    ]
   },
   "yaw": 109.41,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.11,
   "pitch": -7.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_8_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 179
     }
    ]
   },
   "pitch": -7.3,
   "yaw": 115.82,
   "hfov": 5.78
  }
 ],
 "id": "overlay_A614A866_BEF3_9D2F_41CC_7D20C75E9AC4",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_A904160D_BF21_53BD_41CD_A66E25EE7D42, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_AAD43D2D_BF35_EB6D_41DF_4066860A658B, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_8_1_0_map.gif",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 89
     }
    ]
   },
   "yaw": 115.82,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.78,
   "pitch": -7.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_9_0.png",
      "width": 192,
      "class": "ImageResourceLevel",
      "height": 167
     }
    ]
   },
   "pitch": 2.11,
   "yaw": 109.77,
   "hfov": 8.43
  }
 ],
 "id": "overlay_A74F4B8C_BEF2_B3E3_419C_8819A5EBF662",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_AADB0D2E_BF35_EB6F_41E1_A71D8747E3ED, this.ImageResource_AADB1D2E_BF35_EB6F_41E1_B0BB04B8F064, this.ImageResource_301BAEF0_216D_D949_41B8_3E13135E5474, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_9_1_0_map.gif",
      "width": 96,
      "class": "ImageResourceLevel",
      "height": 83
     }
    ]
   },
   "yaw": 109.77,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.43,
   "pitch": 2.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_10_0.png",
      "width": 192,
      "class": "ImageResourceLevel",
      "height": 141
     }
    ]
   },
   "pitch": 9.58,
   "yaw": 109.18,
   "hfov": 8.44
  }
 ],
 "id": "overlay_A6EBB5B7_BEF2_B72D_41E0_5F90A6264D7B",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_A62E6F27_BF33_E71E_414D_7F4159A130D3, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_9BD1576F_BF72_27ED_41E6_C94D013294AF, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_10_1_0_map.gif",
      "width": 96,
      "class": "ImageResourceLevel",
      "height": 70
     }
    ]
   },
   "yaw": 109.18,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.44,
   "pitch": 9.58
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4A2E691_BEB7_9F5F_41C1_1E58DC3CC458",
   "hfov": 2.94,
   "pitch": -17.15,
   "yaw": 61.69,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A6D7CA14_BEF6_BCE3_41C6_D9A8B8021E25",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupMedia(this.window_A91DC6B4_BE96_FF45_41E2_2C723BE0957D, this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116, this.playList_30617EC9_216D_D958_419D_BC029D55E2A8, '90%', '90%', false, false)"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_11_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 61.69,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 2.94,
   "pitch": -17.15
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4A25692_BEB7_9F5D_41E6_A97AB3941196",
   "hfov": 2.93,
   "pitch": -17.99,
   "yaw": 68.87,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A79A7AF3_BEF6_9D25_41C4_10E641F9B442",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupMedia(this.window_A7F7142D_BEB6_B346_41DE_160664B2D89C, this.panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669, this.playList_30601ECA_216D_D958_41AF_1463AE4C6F22, '90%', '90%', false, false)"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_12_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 68.87,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 2.93,
   "pitch": -17.99
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4A39692_BEB7_9F5D_41E0_286E1D0BD12B",
   "hfov": 2.92,
   "pitch": -18.57,
   "yaw": 75.99,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A9470ABB_BEF6_9D25_41E1_BFEC9F22709F",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupMedia(this.window_A2042F7F_BEB2_EDC2_41B1_5BDC3E51217C, this.panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC, this.playList_3067AECA_216D_D958_41BA_029C5BF484E7, '90%', '90%', false, false)"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_13_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 75.99,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 2.92,
   "pitch": -18.57
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4A0D692_BEB7_9F5D_41DD_50EF85E5DB37",
   "hfov": 2.91,
   "pitch": -19.08,
   "yaw": 84.07,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A62A556F_BEF5_973E_41A8_3FA74B909572",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupMedia(this.window_A4DBFBBC_BEB2_9545_41D6_C8D63A5057DF, this.panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E, this.playList_30674ECA_216D_D958_41B5_E4A9A77D902A, '90%', '90%', false, false)"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_14_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 84.07,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 2.91,
   "pitch": -19.08
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4A1A693_BEB7_9F43_41E1_6BB29DD818C2",
   "hfov": 2.92,
   "pitch": -18.82,
   "yaw": 109.14,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A722CBAE_BEF5_F33F_41E2_7CD2EE811F9A",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupMedia(this.window_A4DA311A_BEB3_F54D_41E0_10D105FB3BE2, this.panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98, this.playList_30663ECB_216D_D958_41BB_864F0CDF0D19, '90%', '90%', false, false)"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_16_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 109.14,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 2.92,
   "pitch": -18.82
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4A6E693_BEB7_9F43_41CF_6FF343C909DB",
   "hfov": 2.93,
   "pitch": -17.73,
   "yaw": 116.45,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A9056E81_BEF5_95E5_41E0_A94A278C8589",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupMedia(this.window_A474FCEC_BEB2_ACC6_41CB_181217D91186, this.panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418, this.playList_30651ECB_216D_D958_41B9_EAE4A9A31F1C, '90%', '90%', false, false)"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_17_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 116.45,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 2.93,
   "pitch": -17.73
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4A63693_BEB7_9F43_41E4_8F77876F947E",
   "hfov": 3.08,
   "pitch": -1.51,
   "yaw": 120.75,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A6D0E2DE_BEF5_8D1F_41E0_F4CC9E3A1D41",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupMedia(this.window_A44997AA_BEB2_BD4D_41B0_33A1398521F4, this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C, this.playList_3064BECB_216D_D958_41AA_625FBEBE111C, '90%', '90%', false, false)"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_18_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 120.75,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.08,
   "pitch": -1.51
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4A6F694_BEB7_9F45_417C_6C246082767C",
   "hfov": 3.03,
   "pitch": 10.16,
   "yaw": 120.69,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A6571966_BEF5_7F2F_41D2_CE07DB193AAA",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupMedia(this.window_A3F77F07_BEBD_AD43_41E0_2C31FD642E74, this.panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92, this.playList_30646ECB_216D_D958_41BA_7AC7890EC34A, '90%', '90%', false, false)"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_19_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 120.69,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.03,
   "pitch": 10.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9CD55420_BF75_F913_41D3_7A48F90DF16B",
   "hfov": 13.14,
   "pitch": -11.35,
   "yaw": -89,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A0A7BB52_BF76_2F36_41D0_41B67BD7E48A",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583, this.camera_30FFBF09_216D_D8DB_41AE_B95E382BD831); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_20_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -89,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.14,
   "pitch": -11.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_0_0.png",
      "width": 1290,
      "class": "ImageResourceLevel",
      "height": 974
     }
    ]
   },
   "pitch": 0.61,
   "yaw": 89.18,
   "hfov": 52.66
  }
 ],
 "id": "overlay_A7F22179_BF2E_FBF2_41C6_2C6A56310698",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_9BD48771_BF72_27F5_41E7_DAF1962D5253, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_0_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "yaw": 89.18,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 52.66,
   "pitch": 0.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_1_0.png",
      "width": 64,
      "class": "ImageResourceLevel",
      "height": 61
     }
    ]
   },
   "pitch": -14.8,
   "yaw": 111.49,
   "hfov": 2.74
  }
 ],
 "id": "overlay_A79E3A18_BF2E_6933_4183_23B529B6E83F",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "if(this.getGlobalAudio(this.audio_A61333B3_BF52_3F75_41C0_083E46F7B44F).get('state') == 'playing') { this.pauseGlobalAudio(this.audio_A61333B3_BF52_3F75_41C0_083E46F7B44F); } else { var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_A61333B3_BF52_3F75_41C0_083E46F7B44F); var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else { this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); }"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 111.49,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 2.74,
   "pitch": -14.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9B0E675E_BF72_272F_4185_58F60A69BC9B",
   "hfov": 19.09,
   "pitch": -33.53,
   "yaw": -7.66,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A5A2F4DA_BF6E_1937_41E6_2592D8C0C379",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525, this.camera_30D98F1F_216D_D8F8_41A9_7696158A832A); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_2_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -7.66,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 19.09,
   "pitch": -33.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9B0EA75E_BF72_272F_41C8_0198191AFF7B",
   "hfov": 20.89,
   "pitch": -24.18,
   "yaw": 173.16,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A4D4225B_BF6E_1936_41E1_32CC3C337BB3",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD, this.camera_30EF9F14_216D_D8C9_41BB_358ABCEF8839); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_3_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 173.16,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 20.89,
   "pitch": -24.18
  }
 ]
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid305BDECC_216D_D958_413B_3049F0CE3300",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid305BDECC_216D_D958_413B_3049F0CE3300PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid3066DECA_216D_D958_4192_BB1F98FF911F",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5696"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9CD42421_BF75_F915_41C2_7AF2DC73F85A",
   "hfov": 12.63,
   "pitch": -19.52,
   "yaw": 17.07,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A0EF30B3_BF72_1976_41BC_B16DDEE112D3",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE, this.camera_3085AF88_216D_D7D8_41B1_B3BE31EAFA9D); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_0_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 17.07,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.63,
   "pitch": -19.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9CDBA421_BF75_F915_41DE_47772E66CEF1",
   "hfov": 12.7,
   "pitch": -18.71,
   "yaw": -98.16,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A1D596B1_BF75_F975_41E5_161D6B995BAA",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC, this.camera_33774F98_216D_D7F8_41A5_087ABAF87F9C); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_1_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -98.16,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.7,
   "pitch": -18.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_2_0.png",
      "width": 939,
      "class": "ImageResourceLevel",
      "height": 716
     }
    ]
   },
   "pitch": 0.58,
   "yaw": 90.15,
   "hfov": 39.64
  }
 ],
 "id": "overlay_9ADC8EA8_BF72_2913_41E0_6B8608E63068",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_999FE25B_BF52_1936_41DC_F9120685B889, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_2_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 152
     }
    ]
   },
   "yaw": 90.15,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 39.64,
   "pitch": 0.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_3_0.png",
      "width": 419,
      "class": "ImageResourceLevel",
      "height": 699
     }
    ]
   },
   "pitch": 0.57,
   "yaw": 171.08,
   "hfov": 18.29
  }
 ],
 "id": "overlay_9DE28A0A_BF6E_2916_41CD_9171EAA1F0AF",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_9860F25C_BF52_1932_41C2_F37C30930EC7, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_3_1_0_map.gif",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ]
   },
   "yaw": 171.08,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 18.29,
   "pitch": 0.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "roll": 0,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_4_0.png",
      "width": 494,
      "class": "ImageResourceLevel",
      "height": 707
     }
    ]
   },
   "pitch": 0.69,
   "yaw": -169.57,
   "hfov": 21.48
  }
 ],
 "id": "overlay_9C2C01F1_BF6E_3AF2_41C8_C58DC783679D",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showPopupPanoramaOverlay(this.popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2, {'iconLineWidth':5,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconColor':'#666666','iconWidth':20,'pressedBorderColor':'#000000','backgroundOpacity':0.3,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'rollOverIconHeight':20,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'paddingRight':5,'pressedIconColor':'#888888','paddingTop':5,'pressedBackgroundColorDirection':'vertical','pressedBackgroundOpacity':0.3,'paddingLeft':5,'pressedBorderSize':0,'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','rollOverIconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'backgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','rollOverBorderColor':'#000000','pressedIconHeight':20,'borderSize':0,'rollOverIconWidth':20,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'iconColor':'#000000'}, this.ImageResource_9861A25C_BF52_1932_41E3_B0581D3C0D64, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_4_1_0_map.gif",
      "width": 139,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ]
   },
   "yaw": -169.57,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 21.48,
   "pitch": 0.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_5_0.png",
      "width": 54,
      "class": "ImageResourceLevel",
      "height": 55
     }
    ]
   },
   "pitch": -11.95,
   "yaw": 107,
   "hfov": 2.36
  }
 ],
 "id": "overlay_90C45A72_BFF2_69F6_41C5_5E2F51F26185",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "if(this.getGlobalAudio(this.audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C).get('state') == 'playing') { this.pauseGlobalAudio(this.audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C); } else { var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C); var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else { this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); }"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 107,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 2.36,
   "pitch": -11.95
  }
 ]
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid30684EC5_216D_D948_41B9_F05124ACFA69",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5687"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "id": "viewer_uid306E1EC6_216D_D948_41B1_67D2EB9DF4E0",
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 4000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea5689"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid306C3EC7_216D_D957_41AF_1EC54B772D9B",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uid306C3EC7_216D_D957_41AF_1EC54B772D9BPanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid306F2EC6_216D_D948_41AC_76221BB287DF",
 "id": "viewer_uid306F2EC6_216D_D948_41AC_76221BB287DFVideoPlayer",
 "class": "VideoPlayer"
},
{
 "horizontalAlign": "center",
 "id": "Container_679D9E20_7179_CC6A_41D2_5F5D75BA8E2D",
 "scrollBarColor": "#000000",
 "width": 56,
 "right": "0%",
 "children": [
  "this.IconButton_679D6E20_7179_CC6A_41D6_FDDC1DA4930F"
 ],
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "Container",
 "top": "0%",
 "contentOpaque": false,
 "height": 84,
 "paddingBottom": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "borderRadius": 0,
 "layout": "horizontal",
 "propagateClick": true,
 "verticalAlign": "middle",
 "gap": 10,
 "data": {
  "name": "button menu sup"
 },
 "paddingTop": 0,
 "shadow": false,
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "horizontalAlign": "center",
 "id": "Container_679D4E20_7179_CC6A_41CF_BEB9A80A562A",
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
  "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
  "this.IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0",
  "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
  "this.IconButton_679D1E20_7179_CC6A_41CF_662941DB817D",
  "this.IconButton_6792FE20_7179_CC6A_41DA_F02E92328CA0",
  "this.Image_67F8E069_7168_F4FD_41C3_808E9834266C"
 ],
 "paddingRight": 0,
 "paddingLeft": 0,
 "width": "50.937%",
 "minHeight": 1,
 "class": "Container",
 "borderSize": 0,
 "contentOpaque": false,
 "bottom": "0%",
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "height": "81.519%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "layout": "vertical",
 "propagateClick": true,
 "scrollBarOpacity": 0.5,
 "gap": 0,
 "data": {
  "name": "-button set"
 },
 "paddingTop": 0,
 "shadow": false,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "verticalAlign": "top"
},
{
 "horizontalAlign": "center",
 "maxHeight": 271,
 "maxWidth": 271,
 "id": "Image_C6C7AAB5_C81F_A1AF_41C0_5D9062D984B6",
 "left": "0%",
 "width": "100%",
 "paddingRight": 0,
 "url": "skin/Image_C6C7AAB5_C81F_A1AF_41C0_5D9062D984B6.gif",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "Image",
 "top": "0%",
 "borderSize": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "height": "100%",
 "borderRadius": 0,
 "click": "this.openLink('https://umayor.edu.co/', '_blank')",
 "verticalAlign": "middle",
 "data": {
  "name": "Image2801"
 },
 "propagateClick": false,
 "shadow": false,
 "scaleMode": "fit_inside",
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_E5968F7C_F719_DC15_41A9_2989C0462A71",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_2_0.png",
   "width": 680,
   "class": "ImageResourceLevel",
   "height": 1020
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_D46EF14F_C559_6B4A_41D5_C326E5BD1BB5",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_D46E414F_C559_6B4A_41D6_1A58FC730F5B",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_4_0.png",
   "width": 680,
   "class": "ImageResourceLevel",
   "height": 1020
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_D46F8150_C559_6B56_41E4_0F480C3C4F98",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_5_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_D46CC150_C559_6B56_41C0_2B5D50FC0C54",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_6_0.png",
   "width": 680,
   "class": "ImageResourceLevel",
   "height": 1020
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_D46FB150_C559_6B56_41E0_6BA58B9F2770",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_7_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_D46F5151_C559_6B56_41E4_1414340655C1",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_8_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1110
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_D46C9151_C559_6B56_41E5_1AE858BE7819",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_12_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_DF95A6A2_C548_A9F5_41BC_5ADA030DEDB1",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_13_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_E58C4F7F_F719_DC13_41D0_65082F32FDD1",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_9CDB6421_BF75_F915_415C_65EFB5DE58CC",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_AEAFE12C_BE75_8F23_41DE_C19E21A79B25",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_1_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_AEAF712D_BE75_8F3D_41E1_F7DB60B1522D",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_E580DF8F_F719_DCF3_41E1_8F9A71175E15",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_11_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_A4A2E691_BEB7_9F5F_41C1_1E58DC3CC458",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_12_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_A4A25692_BEB7_9F5D_41E6_A97AB3941196",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_13_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_A4A39692_BEB7_9F5D_41E0_286E1D0BD12B",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_14_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_A4A0D692_BEB7_9F5D_41DD_50EF85E5DB37",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_16_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_A4A1A693_BEB7_9F43_41E1_6BB29DD818C2",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_17_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_A4A6E693_BEB7_9F43_41CF_6FF343C909DB",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_18_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_A4A63693_BEB7_9F43_41E4_8F77876F947E",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_19_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_A4A6F694_BEB7_9F45_417C_6C246082767C",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_20_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_9CD55420_BF75_F913_41D3_7A48F90DF16B",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_2_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_9B0E675E_BF72_272F_4185_58F60A69BC9B",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_3_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_9B0EA75E_BF72_272F_41C8_0198191AFF7B",
 "frameDuration": 33,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_9CD42421_BF75_F915_41C2_7AF2DC73F85A",
 "frameDuration": 41,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_1_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_9CDBA421_BF75_F915_41DE_47772E66CEF1",
 "frameDuration": 41,
 "colCount": 4
},
{
 "horizontalAlign": "center",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_679D6E20_7179_CC6A_41D6_FDDC1DA4930F",
 "transparencyActive": true,
 "width": 40,
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_679D6E20_7179_CC6A_41D6_FDDC1DA4930F_pressed_rollover.png",
 "iconURL": "skin/IconButton_679D6E20_7179_CC6A_41D6_FDDC1DA4930F.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "IconButton",
 "borderSize": 0,
 "height": 60,
 "paddingBottom": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_679D6E20_7179_CC6A_41D6_FDDC1DA4930F_pressed.png",
 "borderRadius": 0,
 "click": "if(!this.Container_679D4E20_7179_CC6A_41CF_BEB9A80A562A.get('visible')){ this.setComponentVisibility(this.Container_679D4E20_7179_CC6A_41CF_BEB9A80A562A, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_679D4E20_7179_CC6A_41CF_BEB9A80A562A, false, 0, null, null, false) }",
 "propagateClick": true,
 "verticalAlign": "middle",
 "data": {
  "name": "image button menu"
 },
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_6792FE20_7179_CC6A_41DA_F02E92328CA0",
 "transparencyActive": true,
 "width": 40,
 "paddingRight": 0,
 "iconURL": "skin/IconButton_6792FE20_7179_CC6A_41DA_F02E92328CA0.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "IconButton",
 "borderSize": 0,
 "height": 58,
 "paddingBottom": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "click": "this.openLink('https://www.facebook.com/UmayorCtg', '_blank')",
 "rollOverIconURL": "skin/IconButton_6792FE20_7179_CC6A_41DA_F02E92328CA0_rollover.png",
 "propagateClick": true,
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton FB"
 },
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "Image_67F8E069_7168_F4FD_41C3_808E9834266C",
 "width": 35,
 "paddingRight": 0,
 "url": "skin/Image_67F8E069_7168_F4FD_41C3_808E9834266C.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "class": "Image",
 "borderSize": 0,
 "height": 48,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "click": "this.openLink('https://wa.me/qr/SZEYYL5TW57AL1', '_blank')",
 "propagateClick": false,
 "verticalAlign": "middle",
 "data": {
  "name": "Image29745"
 },
 "paddingTop": 0,
 "shadow": false,
 "scaleMode": "fit_inside",
 "cursor": "hand"
}]
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
