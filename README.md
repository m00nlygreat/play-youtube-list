# play-youtube-list

별 거 아니고 url 파라미터(`?v=`)로 유튜브 영상 ID를 여러 개 주면 차례대로 플레이하는 팝업 창을 띄워줍니다.

코드는 GPT가 짜줬습니다.

## 예제 보기

`https://m00nlygreat.github.io/yt?v=` 의 뒤에 유튜브 영상 ID를 콤마(`,`)로 결합해서 붙여줍니다.

[https://m00nlygreat.github.io/yt?v=9EOg1LOd7yg,kqLgfQZp5h0,uiOlbEgQz08](https://m00nlygreat.github.io/play-youtube-list?v=9EOg1LOd7yg,kqLgfQZp5h0,uiOlbEgQz08)


## 활용

이 자바스크립트 북마클릿은 유튜브 영상 페이지에서 실행하면, 현재 영상의 ID를 클립보드에 쉼표를 붙여 이어줍니다.

```javascript
javascript:(async()=>{const videoId=new URL(window.location.href).searchParams.get("v");if(!videoId){console.error("영상 ID를 찾을 수 없습니다.");return;}try{const clipboardText=await navigator.clipboard.readText();const isValidClipboard=clipboardText.split(',').every(id=>id.match(/^[\w-]{11}$/));let newClipboardContent;if(isValidClipboard){const clipboardIds=clipboardText.split(',');if(!clipboardIds.includes(videoId)){clipboardIds.push(videoId);}newClipboardContent=clipboardIds.join(',');}else{newClipboardContent=videoId;}await navigator.clipboard.writeText(newClipboardContent);console.log("클립보드에 ID가 성공적으로 추가되었습니다:",newClipboardContent);}catch(error){console.error("클립보드에 접근하는 중 오류가 발생했습니다:",error);}})();
```

그 다음 이 북마클릿을 실행하면 저장된 클립보드의 영상 리스트를 팝업으로 띄워줍니다.

```javascript
javascript:navigator.clipboard.readText().then(text=>{if(text){location.href=`https://m00nlygreat.github.io/yt?v=${encodeURIComponent(text)}`;}else{alert(%27Clipboard is empty or contains no valid video IDs%27);}});
```
