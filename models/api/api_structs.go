package api

// API Response
type APIResult struct {
	Success bool
	Code    uint
	Data    interface{}
	Message string
	Count   uint
}

// APIPageParam API 分頁
type APIPageParam struct {
	Page int
	Per  int
}
