var JERRYS_DATA = {};
var DETECTED_PEOPLE = [];

function getRealtime(groupId, yawThreshold, attendanceNumber, callback)
{
	takeSnapshot(function(imageData)
	{
		analyzeFaces(imageData, function(faceData)
		{
			var emotions = ["happiness", "sadness", "contempt", "anger", "neutral"];
			var data = {percentEngaged: 0};
			$.map(faceData, function(face)
			{
				var fa = face.faceAttributes;
				if(Math.abs(fa.headPose.yaw) < 20) data.percentEngaged += 1;
				$.map(emotions, function(emotion)
				{
					if(!data[emotion]) data[emotion] = 0;
					data[emotion] += fa.emotion[emotion];
				})	
			});
			//Normalize
			data.percentEngaged /= attendanceNumber;
			$.map(emotions, function(emotion)
			{
				data[emotion] /= faceData.length;
			})

			console.log("Detected " + faceData.length + " people.");
			
			var detectedIds = $.map(faceData, function(face) { return face.faceId; });
			//console.log(detectedIds);
					
					//Match these face IDs to people already in our class
					identifyFaces(GROUP_ID, detectedIds, function(faceMatches)
					{
						$.map(faceMatches, function(face, i)
						{	
							//Did we find any matching candidates?
							if(face.candidates.length > 0)
							{
								//If so, grab their person id
								var personId = face.candidates[0].personId;
								//Add them to our map
								if(DETECTED_PEOPLE.indexOf(personId) < 0)
								{
									DETECTED_PEOPLE.push(personId);
								}
								
							}
							
						});
						console.log(DETECTED_PEOPLE);
						sessionStorage.detectedPeople = DETECTED_PEOPLE;
						
						callback(data);

					})
			
			

		});
	});
}

	
$(function()
{
	webcamInit("webcamStream", function() {});

});