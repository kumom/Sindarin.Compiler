// hello.cc using N-API
#include <node_api.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dlfcn.h>

#define ST_N if (status != napi_ok) return nullptr

namespace clib {

typedef void *(*foreign0)();
typedef void *(*foreign1)(void *, ...);

napi_value cprim(napi_env env, void *p) {
    napi_value v;
    napi_status status;
    status = napi_create_object(env, &v);              ST_N;
    status = napi_wrap(env, v, p, NULL, NULL, NULL);   ST_N;
    return v;
}

void *cprim_get(napi_env env, napi_value v) {
    napi_status status;
    void *p;
    status = napi_unwrap(env, v, &p);
    if (status != napi_ok) napi_throw_error(env, NULL, "not a C value");
    return p;
}

napi_value js_dlsym(napi_env env, napi_callback_info args) {
    napi_status status;

    size_t argc = 1;
    napi_value this_, argv[1];
    status = napi_get_cb_info(env, args, &argc, argv, &this_, NULL);  ST_N;

    char buf[256];
    size_t len;
    status = napi_get_value_string_utf8(env, argv[0], buf, sizeof(buf), &len);  ST_N;

    void *p = dlsym(RTLD_DEFAULT, buf);
    if (p == NULL) { fprintf(stderr, "%s\n", dlerror()); return nullptr; }

    return cprim(env, p);
}

napi_value js_ccall(napi_env env, napi_callback_info args) {
    napi_status status;

    size_t argc = 5;
    napi_value this_, argv[5];
    status = napi_get_cb_info(env, args, &argc, argv, &this_, NULL);  ST_N;

    void *p, *a0, *a1, *a2, *a3,
         *ret;
    status = napi_unwrap(env, argv[0], &p);   ST_N;
    switch (argc) {
    case 1: ret = ((foreign0)p)();  break;
    case 2:
        status = napi_unwrap(env, argv[1], &a0);  ST_N;
        ret = ((foreign1)p)(a0);  break;
    case 3:
        status = napi_unwrap(env, argv[1], &a0);  ST_N;
        status = napi_unwrap(env, argv[2], &a1);  ST_N;
        ret = ((foreign1)p)(a0, a1);  break;
    case 4:
        status = napi_unwrap(env, argv[1], &a0);  ST_N;
        status = napi_unwrap(env, argv[2], &a1);  ST_N;
        status = napi_unwrap(env, argv[3], &a2);  ST_N;
        ret = ((foreign1)p)(a0, a1, a2);  break;
    case 5:
        status = napi_unwrap(env, argv[1], &a0);  ST_N;
        status = napi_unwrap(env, argv[2], &a1);  ST_N;
        status = napi_unwrap(env, argv[3], &a2);  ST_N;
        status = napi_unwrap(env, argv[4], &a3);  ST_N;
        ret = ((foreign1)p)(a0, a1, a2, a3);  break;
    default:
        napi_throw_error(env, NULL, "ccall: maximum argument count exceeded");
        return nullptr;
    }

    return cprim(env, ret);
}

napi_value js_cint(napi_env env, napi_callback_info args) {
    napi_status status;

    size_t argc = 1;
    napi_value this_, argv[1];
    status = napi_get_cb_info(env, args, &argc, argv, &this_, NULL);  ST_N;

    int64_t nv;  /** @oops assuming 64-bit here */
    status = napi_get_value_int64(env, argv[0], &nv);

    return cprim(env, (void*)nv);
}

napi_value js_cint_tonumber(napi_env env, napi_callback_info args) {
    napi_status status;

    size_t argc = 1;
    napi_value this_, argv[1];
    status = napi_get_cb_info(env, args, &argc, argv, &this_, NULL);  ST_N;

    napi_value v;
    status = napi_create_int64(env, (int64_t)cprim_get(env, argv[0]), &v); ST_N;
    return v;
}

napi_value js_cstring(napi_env env, napi_callback_info args) {
    napi_status status;

    size_t argc = 1;
    napi_value this_, argv[1];
    status = napi_get_cb_info(env, args, &argc, argv, &this_, NULL);  ST_N;

    size_t sz;
	status = napi_get_value_string_utf8(env, argv[0], NULL, 0, &sz);  ST_N;
	char *buf = (char*)malloc(sz+1);
	status = napi_get_value_string_utf8(env, argv[0], buf, sz+1, NULL);  ST_N;

    return cprim(env, (void*)buf);  /** @ohno never freed */
}

napi_value js_cbuffer(napi_env env, napi_callback_info args) {
    napi_status status;

    size_t argc = 1;
    napi_value this_, argv[1];
    status = napi_get_cb_info(env, args, &argc, argv, &this_, NULL);  ST_N;

    void *buf; size_t length;
    status = napi_get_buffer_info(env, argv[0], &buf, &length);  ST_N;

    return cprim(env, buf);
}

napi_value js_cbuffer_tobuffer(napi_env env, napi_callback_info args) {
    napi_status status;

    size_t argc = 2;
    napi_value this_, argv[2];
    status = napi_get_cb_info(env, args, &argc, argv, &this_, NULL);  ST_N;

    void *buf = cprim_get(env, argv[0]);
    size_t length = (size_t)cprim_get(env, argv[1]);
    napi_value v;
    void *dest;
    status = napi_create_buffer(env, length, &dest, &v);  ST_N;
    memcpy(dest, buf, length);

    return v;
}

template < typename W >
napi_value js_cset(napi_env env, napi_callback_info args) {
    napi_status status;

    size_t argc = 3;
    napi_value this_, argv[3];
    status = napi_get_cb_info(env, args, &argc, argv, &this_, NULL);  ST_N;

    W *base = (W *)cprim_get(env, argv[0]);
    int64_t offset;
	status = napi_get_value_int64(env, argv[1], &offset);  ST_N;
    W val = (W)(size_t)cprim_get(env, argv[2]);
	base[offset] = val;

    return nullptr;
}

napi_value js_csetw(napi_env env, napi_callback_info args) {
    return js_cset<void*>(env, args);
}

napi_value js_cset16(napi_env env, napi_callback_info args) {
    return js_cset<int16_t>(env, args);
}

napi_value js_cset32(napi_env env, napi_callback_info args) {
    return js_cset<int32_t>(env, args);
}

napi_status export_cfunction(napi_env env, napi_value exports,
                      const char *name, napi_callback func) {
    napi_status status;
    napi_value fn;

    status = napi_create_function(env, nullptr, 0, func, nullptr, &fn);
    if (status != napi_ok) return status;

    status = napi_set_named_property(env, exports, name, fn);
    return status;
}

napi_value init(napi_env env, napi_value exports) {
    napi_status status;

    status = export_cfunction(env, exports, "dlsym",    js_dlsym);       ST_N;
    status = export_cfunction(env, exports, "ccall",    js_ccall);       ST_N;
    status = export_cfunction(env, exports, "cint",     js_cint);        ST_N;
    status = export_cfunction(env, exports, "cint_",    js_cint_tonumber);     ST_N;
    status = export_cfunction(env, exports, "cstring",  js_cstring);     ST_N;
    status = export_cfunction(env, exports, "cbuffer",  js_cbuffer);     ST_N;
    status = export_cfunction(env, exports, "cbuffer_", js_cbuffer_tobuffer);     ST_N;
    status = export_cfunction(env, exports, "csetw",    js_csetw);       ST_N;
    status = export_cfunction(env, exports, "cset16",   js_cset16);      ST_N;
    status = export_cfunction(env, exports, "cset32",   js_cset32);      ST_N;
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)

}  // namespace clib
