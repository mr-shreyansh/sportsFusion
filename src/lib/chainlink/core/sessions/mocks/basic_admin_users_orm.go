// Code generated by mockery v2.43.2. DO NOT EDIT.

package mocks

import (
	context "context"

	sessions "github.com/smartcontractkit/chainlink/v2/core/sessions"
	mock "github.com/stretchr/testify/mock"
)

// BasicAdminUsersORM is an autogenerated mock type for the BasicAdminUsersORM type
type BasicAdminUsersORM struct {
	mock.Mock
}

// CreateUser provides a mock function with given fields: ctx, user
func (_m *BasicAdminUsersORM) CreateUser(ctx context.Context, user *sessions.User) error {
	ret := _m.Called(ctx, user)

	if len(ret) == 0 {
		panic("no return value specified for CreateUser")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, *sessions.User) error); ok {
		r0 = rf(ctx, user)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// FindUser provides a mock function with given fields: ctx, email
func (_m *BasicAdminUsersORM) FindUser(ctx context.Context, email string) (sessions.User, error) {
	ret := _m.Called(ctx, email)

	if len(ret) == 0 {
		panic("no return value specified for FindUser")
	}

	var r0 sessions.User
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, string) (sessions.User, error)); ok {
		return rf(ctx, email)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string) sessions.User); ok {
		r0 = rf(ctx, email)
	} else {
		r0 = ret.Get(0).(sessions.User)
	}

	if rf, ok := ret.Get(1).(func(context.Context, string) error); ok {
		r1 = rf(ctx, email)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// ListUsers provides a mock function with given fields: ctx
func (_m *BasicAdminUsersORM) ListUsers(ctx context.Context) ([]sessions.User, error) {
	ret := _m.Called(ctx)

	if len(ret) == 0 {
		panic("no return value specified for ListUsers")
	}

	var r0 []sessions.User
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context) ([]sessions.User, error)); ok {
		return rf(ctx)
	}
	if rf, ok := ret.Get(0).(func(context.Context) []sessions.User); ok {
		r0 = rf(ctx)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]sessions.User)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context) error); ok {
		r1 = rf(ctx)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewBasicAdminUsersORM creates a new instance of BasicAdminUsersORM. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewBasicAdminUsersORM(t interface {
	mock.TestingT
	Cleanup(func())
}) *BasicAdminUsersORM {
	mock := &BasicAdminUsersORM{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}