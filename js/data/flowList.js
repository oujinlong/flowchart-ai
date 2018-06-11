/**
 * Created by wendyliu on 2018/5/23.
 */
var App = App || {};
App.config = App.config || {};

(function() {

	'use strict';

	App.config.flowList = {
		Simple: '{"cells":[{"type":"csf.Start","position":{"x":170,"y":520},"size":{"width":60,"height":60},"angle":0,"id":"5853c199-b600-4a76-aab5-b5300cb03c6d","z":1,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"}}},{"type":"csf.Auto","position":{"x":326,"y":520},"size":{"width":60,"height":60},"angle":0,"id":"ef59849b-e244-42ad-9ce1-82c121e0577b","z":2,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"},"service":{"serviceName":"simpleServiceName","serviceType":"simple"}}},{"type":"csf.End","position":{"x":483,"y":520},"size":{"width":60,"height":60},"angle":0,"id":"18863dcd-ba50-4174-97cb-28d7bb3ecd56","z":3,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"}}},{"type":"csf.Link","router":{"name":"normal"},"connector":{"name":"rounded"},"labels":[],"source":{"id":"5853c199-b600-4a76-aab5-b5300cb03c6d"},"target":{"id":"ef59849b-e244-42ad-9ce1-82c121e0577b"},"id":"416e0e42-be33-4f7c-8204-6fa77b28faad","z":4,"attrs":{}},{"type":"csf.Link","router":{"name":"normal"},"connector":{"name":"rounded"},"labels":[],"source":{"id":"ef59849b-e244-42ad-9ce1-82c121e0577b"},"target":{"id":"18863dcd-ba50-4174-97cb-28d7bb3ecd56"},"id":"28027147-413b-4f01-8871-d27b85d94326","z":5,"attrs":{}}]}',
		'With-Judge': '{"cells":[{"type":"csf.Start","position":{"x":170,"y":540},"size":{"width":60,"height":60},"angle":0,"id":"031b3676-8773-4395-9215-28501b363edb","z":1,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"}}},{"type":"csf.Judge","position":{"x":301,"y":540},"size":{"width":60,"height":60},"angle":0,"id":"d6cfc265-69dc-4958-b7ec-f47108aa21e9","z":2,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"}}},{"type":"csf.Auto","position":{"x":480,"y":470},"size":{"width":60,"height":60},"angle":0,"id":"3d26429c-d613-43c4-9a59-62a2b0dfac17","z":3,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"},"service":{"serviceName":"withJudgeServiceName","serviceType":"withJudge"}}},{"type":"csf.End","position":{"x":480,"y":628},"size":{"width":60,"height":60},"angle":0,"id":"df5322e9-3c7e-429f-aa5e-d2010e850207","z":4,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"}}},{"type":"csf.Link","router":{"name":"normal"},"connector":{"name":"rounded"},"labels":[],"source":{"id":"031b3676-8773-4395-9215-28501b363edb"},"target":{"id":"d6cfc265-69dc-4958-b7ec-f47108aa21e9"},"id":"6dca48af-a08c-4526-86f7-5e5d60d8e594","z":5,"attrs":{}},{"type":"csf.Link","router":{"name":"normal"},"connector":{"name":"rounded"},"labels":[{"attrs":{"text":{"text":"true"},"rect":{}},"position":0.5}],"source":{"id":"d6cfc265-69dc-4958-b7ec-f47108aa21e9"},"target":{"id":"3d26429c-d613-43c4-9a59-62a2b0dfac17"},"id":"b459b1fb-dba9-4bbd-9b37-ad70d7f756a4","z":6,"attrs":{}},{"type":"csf.Link","router":{"name":"normal"},"connector":{"name":"rounded"},"labels":[{"attrs":{"text":{"text":"false"},"rect":{}},"position":0.5}],"source":{"id":"d6cfc265-69dc-4958-b7ec-f47108aa21e9"},"target":{"id":"df5322e9-3c7e-429f-aa5e-d2010e850207"},"id":"24c77bf1-57fc-4f88-b547-47d42b4b43c2","z":7,"attrs":{}},{"type":"csf.Link","router":{"name":"normal"},"connector":{"name":"rounded"},"labels":[],"source":{"id":"3d26429c-d613-43c4-9a59-62a2b0dfac17"},"target":{"id":"df5322e9-3c7e-429f-aa5e-d2010e850207"},"id":"be11f6a4-1236-4ea3-a77b-63250f5f481b","z":8,"attrs":{}}]}',
		'With-Flow': '{"cells":[{"type":"csf.Start","position":{"x":130,"y":510},"size":{"width":60,"height":60},"angle":0,"id":"3a92815f-ae2c-404a-ba6b-135d65689a6f","z":1,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"}}},{"type":"csf.Auto","position":{"x":254,"y":510},"size":{"width":60,"height":60},"angle":0,"id":"44dc2408-731e-4e47-a0bd-5e42a7869af8","z":2,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"},"service":{"serviceName":"withFlowServiceName","serviceType":"withFlow"}}},{"type":"csf.Flow","position":{"x":395,"y":518},"size":{"width":90,"height":45},"angle":0,"id":"5dd80b02-de23-4b3c-ae68-6af869d9c5dd","z":3,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"},"label":{"text":"simple"},"linkSource":{"0":"S","1":"i","2":"m","3":"p","4":"l","5":"e"}}},{"type":"csf.End","position":{"x":573,"y":510},"size":{"width":60,"height":60},"angle":0,"id":"2cea61fe-7b4e-488c-909b-21410cd0d23b","z":4,"attrs":{"root":{"dataTooltipPosition":"left","dataTooltipPositionSelector":".joint-stencil"}}},{"type":"csf.Link","router":{"name":"normal"},"connector":{"name":"rounded"},"labels":[],"source":{"id":"3a92815f-ae2c-404a-ba6b-135d65689a6f"},"target":{"id":"44dc2408-731e-4e47-a0bd-5e42a7869af8"},"id":"764f1efb-7419-4d87-a0d1-f688d07fd4c0","z":5,"attrs":{}},{"type":"csf.Link","router":{"name":"normal"},"connector":{"name":"rounded"},"labels":[],"source":{"id":"44dc2408-731e-4e47-a0bd-5e42a7869af8"},"target":{"id":"5dd80b02-de23-4b3c-ae68-6af869d9c5dd"},"id":"735ce84c-b28f-49af-b575-959062a5422d","z":6,"attrs":{}},{"type":"csf.Link","router":{"name":"normal"},"connector":{"name":"rounded"},"labels":[],"source":{"id":"5dd80b02-de23-4b3c-ae68-6af869d9c5dd"},"target":{"id":"2cea61fe-7b4e-488c-909b-21410cd0d23b"},"id":"5ad3a055-ad99-487b-b106-1d6155ccbc86","z":7,"attrs":{}}]}'
	};
})();