// Code generated by mockery v2.43.2. DO NOT EDIT.

package client

import (
	types "github.com/smartcontractkit/chainlink/v2/common/types"
	mock "github.com/stretchr/testify/mock"
)

// mockNodeSelector is an autogenerated mock type for the NodeSelector type
type mockNodeSelector[CHAIN_ID types.ID, HEAD Head, RPC NodeClient[CHAIN_ID, HEAD]] struct {
	mock.Mock
}

// Name provides a mock function with given fields:
func (_m *mockNodeSelector[CHAIN_ID, HEAD, RPC]) Name() string {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for Name")
	}

	var r0 string
	if rf, ok := ret.Get(0).(func() string); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(string)
	}

	return r0
}

// Select provides a mock function with given fields:
func (_m *mockNodeSelector[CHAIN_ID, HEAD, RPC]) Select() Node[CHAIN_ID, HEAD, RPC] {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for Select")
	}

	var r0 Node[CHAIN_ID, HEAD, RPC]
	if rf, ok := ret.Get(0).(func() Node[CHAIN_ID, HEAD, RPC]); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(Node[CHAIN_ID, HEAD, RPC])
		}
	}

	return r0
}

// newMockNodeSelector creates a new instance of mockNodeSelector. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func newMockNodeSelector[CHAIN_ID types.ID, HEAD Head, RPC NodeClient[CHAIN_ID, HEAD]](t interface {
	mock.TestingT
	Cleanup(func())
}) *mockNodeSelector[CHAIN_ID, HEAD, RPC] {
	mock := &mockNodeSelector[CHAIN_ID, HEAD, RPC]{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
