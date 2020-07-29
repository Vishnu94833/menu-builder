const staticCacheName = 'site-static-v8';
const dynamicCacheName = 'site-dynamic-v8';
const assets = [
  '/',
  'index.html',
//   'https://vishnukuppan1796-dev-ed.my.salesforce.com/services/data/v49.0/query/?q=SELECT+id__c,dishId__c,rating__c,author__c,comment__c,date__c+from+Comment__c',
//   'https://vishnukuppan1796-dev-ed.my.salesforce.com/services/data/v49.0/query/?q=SELECT+Id,id__c,Name__c,image__c,category__c,label__c,price__c,featured__c,description__c+from+dishes__c',
//   'https://vishnukuppan1796-dev-ed.my.salesforce.com/services/data/v49.0/query/?q=SELECT+id__c,Name__c,Label__c,Price__c,Image__c,Featured__c,Description__c+from+Promotion__c',
//   'https://vishnukuppan1796-dev-ed.my.salesforce.com/services/data/v49.0/query/?q=SELECT+id__c,Name__c,Image__c,Designation__c,Abbr__c,Featured__c,Description__c+from+Leader__c'
]

this.addEventListener('install', (event) => {
//   console.log('service worker has been installed', event)

  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
    //   console.log('caching shell assets');
      cache.addAll(assets);
    })   //asyc task and again returns a promise
  )

  //this function can be used to add assets to the cache.
  // common assets that can be used when offline.
})




//activate service worker
this.addEventListener('activate', (event) => {
//   console.log('service worker has been activated', event)
  event.waitUntil(
    caches.keys().then((keys) => {
    //   console.log(keys)  //keys have the names of 2 different caches (staticCacheName)..
      return Promise.all(keys // to delete the old version of caches.  2nd promise resolved
        .filter(keys => keys !== staticCacheName && keys !== dynamicCacheName)
        .map(keys => caches.delete(keys))  //this will return an array of promises.  1st promise resolved..
      )
    })
  )
//   console.log("deleted")

})


//cache size limit function
const limitCacheSize = (name, size) => {
//   console.log('limit size initiated')
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}



//fetch event
//intercepting requests
this.addEventListener('fetch', evt => {
  //check to avoid this if the request it to google database api
  if (evt.request.url.indexOf('vishnukuppan1796-dev-ed.my.salesforce.com') === -1) {
    fetch("https://vishnukuppan1796-dev-ed.my.salesforce.com/services/data/v49.0/query/?q=SELECT+Id,id__c,Name__c,image__c,category__c,label__c,price__c,featured__c,description__c+from+dishes__c", {
        headers: {
          Authorization: "Bearer 00D2w000001NWR3!ARYAQIK0LuzHrz96eusoZAJ4HkY5krtWAFujGiVI1adH6vefJZljAkJK9eXNCwD_DNpCtOaWkyQlg4vXJdtj6ZlTO9rxoqB3"
        }
      })
      .then(res=>{
          console.log("FETCH RESPONSE",res);
      })
      .catch(err=>{
          console.log(err);
      })
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
            // console.log("FETCH RESPONSE",evt.request);
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            limitCacheSize(dynamicCacheName, 15)
            return fetchRes;
          })
        });
      }).catch(() => {
        // if (evt.request.url.indexOf('.html') > -1) { //can also be done for different resource type.
        //   return caches.match('/pages/fallback.html');
        // }

      })
    );
  }


//   console.log('fetch event', evt);


});